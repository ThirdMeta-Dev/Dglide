export type LeadSource = {
  formType?: string;
  sourcePath?: string;
  sourceUrl?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  utmId?: string;
  utmSourcePlatform?: string;
  utmCreativeFormat?: string;
  utmMarketingTactic?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  utmParameters?: string;
};

const SOURCE_BLOCK_TITLE = "--- Lead Source ---";
const SOURCE_BLOCK_SEPARATOR = `\n\n${SOURCE_BLOCK_TITLE}\n`;

function cleanLine(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, maxLength);
}

function cleanSourcePath(value: unknown) {
  const cleaned = cleanLine(value, 300);
  if (!cleaned.startsWith("/")) return "";
  return cleaned;
}

function cleanSourceUrl(value: unknown) {
  const cleaned = cleanLine(value, 1000);
  if (!cleaned) return "";

  try {
    const url = new URL(cleaned);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return url.toString();
  } catch {
    return "";
  }
}

function cleanUtmParameters(value: unknown) {
  const cleaned = cleanLine(value, 5000);
  if (!cleaned) return "";

  try {
    const parsed = JSON.parse(cleaned) as Record<string, unknown>;
    const safe = Object.entries(parsed).reduce<Record<string, string | string[]>>((result, [key, rawValue]) => {
      if (!/^utm_[a-z0-9_]+$/i.test(key)) return result;
      if (typeof rawValue === "string") result[key] = cleanLine(rawValue, 500);
      else if (Array.isArray(rawValue)) {
        const values = rawValue.map((item) => cleanLine(item, 500)).filter(Boolean);
        if (values.length > 0) result[key] = values;
      }
      return result;
    }, {});
    return Object.keys(safe).length > 0 ? JSON.stringify(safe) : "";
  } catch {
    return "";
  }
}

function pathFromUrl(sourceUrl: string) {
  if (!sourceUrl) return "";

  try {
    const url = new URL(sourceUrl);
    return `${url.pathname}${url.search}`;
  } catch {
    return "";
  }
}

const ATTRIBUTION_FIELDS = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_term: "utmTerm",
  utm_content: "utmContent",
  utm_id: "utmId",
  utm_source_platform: "utmSourcePlatform",
  utm_creative_format: "utmCreativeFormat",
  utm_marketing_tactic: "utmMarketingTactic",
  gclid: "gclid",
  fbclid: "fbclid",
  msclkid: "msclkid",
} as const;

export function getBrowserLeadSource({ marketingParamsOnly = false }: { marketingParamsOnly?: boolean } = {}): LeadSource {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const attribution = Object.entries(ATTRIBUTION_FIELDS).reduce<LeadSource>((result, [queryKey, field]) => {
    const value = params.get(queryKey)?.trim();
    if (value) result[field] = value;
    return result;
  }, {});
  const allUtmParameters = Array.from(params.entries()).reduce<Record<string, string | string[]>>((result, [key, value]) => {
    if (!key.toLowerCase().startsWith("utm_")) return result;
    const existing = result[key];
    if (existing === undefined) result[key] = value;
    else if (Array.isArray(existing)) existing.push(value);
    else result[key] = [existing, value];
    return result;
  }, {});
  const sourceParams = marketingParamsOnly
    ? new URLSearchParams(Array.from(params.entries()).filter(([key]) => key in ATTRIBUTION_FIELDS))
    : params;
  const sourceSearch = sourceParams.toString();
  const sourcePath = `${window.location.pathname}${sourceSearch ? `?${sourceSearch}` : ""}`;
  const sourceUrl = `${window.location.origin}${sourcePath}`;
  let referrer = document.referrer || undefined;
  if (marketingParamsOnly && referrer) {
    try {
      const referrerUrl = new URL(referrer);
      const safeReferrerParams = new URLSearchParams(
        Array.from(referrerUrl.searchParams.entries()).filter(([key]) => key in ATTRIBUTION_FIELDS)
      );
      const safeReferrerSearch = safeReferrerParams.toString();
      referrer = `${referrerUrl.origin}${referrerUrl.pathname}${safeReferrerSearch ? `?${safeReferrerSearch}` : ""}`;
    } catch {
      referrer = undefined;
    }
  }

  return {
    sourcePath,
    sourceUrl,
    referrer,
    ...attribution,
    utmParameters: Object.keys(allUtmParameters).length > 0 ? JSON.stringify(allUtmParameters) : undefined,
  };
}

export function readLeadSource(
  payload: Record<string, unknown>,
  formType: string,
  fallbackUrl?: string | null
): LeadSource {
  const sourceUrl = cleanSourceUrl(payload.sourceUrl) || cleanSourceUrl(fallbackUrl);
  const sourcePath = cleanSourcePath(payload.sourcePath) || cleanSourcePath(pathFromUrl(sourceUrl));
  const attribution = Object.values(ATTRIBUTION_FIELDS).reduce<LeadSource>((result, field) => {
    const value = cleanLine(payload[field], 500);
    if (value) result[field] = value;
    return result;
  }, {});

  return {
    formType: cleanLine(formType, 120),
    sourcePath: sourcePath || undefined,
    sourceUrl: sourceUrl || undefined,
    referrer: cleanSourceUrl(payload.referrer) || undefined,
    ...attribution,
    utmParameters: cleanUtmParameters(payload.utmParameters) || undefined,
  };
}

export function appendLeadSourceToMessage(message: string, source: LeadSource) {
  const entries = [
    source.formType ? `Form: ${source.formType}` : "",
    source.sourcePath ? `Page: ${source.sourcePath}` : "",
    source.sourceUrl ? `URL: ${source.sourceUrl}` : "",
    source.referrer ? `Referrer: ${source.referrer}` : "",
    source.utmSource ? `UTM Source: ${source.utmSource}` : "",
    source.utmMedium ? `UTM Medium: ${source.utmMedium}` : "",
    source.utmCampaign ? `UTM Campaign: ${source.utmCampaign}` : "",
    source.utmTerm ? `UTM Term: ${source.utmTerm}` : "",
    source.utmContent ? `UTM Content: ${source.utmContent}` : "",
    source.utmId ? `UTM ID: ${source.utmId}` : "",
    source.utmSourcePlatform ? `UTM Source Platform: ${source.utmSourcePlatform}` : "",
    source.utmCreativeFormat ? `UTM Creative Format: ${source.utmCreativeFormat}` : "",
    source.utmMarketingTactic ? `UTM Marketing Tactic: ${source.utmMarketingTactic}` : "",
    source.gclid ? `GCLID: ${source.gclid}` : "",
    source.fbclid ? `FBCLID: ${source.fbclid}` : "",
    source.msclkid ? `MSCLKID: ${source.msclkid}` : "",
    source.utmParameters ? `All UTM Parameters: ${source.utmParameters}` : "",
  ].filter(Boolean);

  const cleanedMessage = message.trim();
  if (entries.length === 0) return cleanedMessage;

  const prefix = cleanedMessage ? SOURCE_BLOCK_SEPARATOR : `${SOURCE_BLOCK_TITLE}\n`;
  return `${cleanedMessage}${prefix}${entries.join("\n")}`;
}

export function splitLeadMessage(message: string | null | undefined): {
  message: string;
  source: LeadSource;
} {
  const value = typeof message === "string" ? message : "";
  const separatorIndex = value.lastIndexOf(SOURCE_BLOCK_SEPARATOR);
  const startsWithBlock = value.startsWith(`${SOURCE_BLOCK_TITLE}\n`);

  let cleanMessage = value.trim();
  let sourceBlock = "";

  if (separatorIndex >= 0) {
    cleanMessage = value.slice(0, separatorIndex).trim();
    sourceBlock = value.slice(separatorIndex + SOURCE_BLOCK_SEPARATOR.length).trim();
  } else if (startsWithBlock) {
    cleanMessage = "";
    sourceBlock = value.slice(`${SOURCE_BLOCK_TITLE}\n`.length).trim();
  }

  const source: LeadSource = {};

  sourceBlock.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    if (!key || !value) return;

    if (key === "Form") source.formType = cleanLine(value, 120);
    if (key === "Page") source.sourcePath = cleanSourcePath(value) || undefined;
    if (key === "URL") source.sourceUrl = cleanSourceUrl(value) || undefined;
    if (key === "Referrer") source.referrer = cleanSourceUrl(value) || undefined;
    if (key === "UTM Source") source.utmSource = cleanLine(value, 500) || undefined;
    if (key === "UTM Medium") source.utmMedium = cleanLine(value, 500) || undefined;
    if (key === "UTM Campaign") source.utmCampaign = cleanLine(value, 500) || undefined;
    if (key === "UTM Term") source.utmTerm = cleanLine(value, 500) || undefined;
    if (key === "UTM Content") source.utmContent = cleanLine(value, 500) || undefined;
    if (key === "UTM ID") source.utmId = cleanLine(value, 500) || undefined;
    if (key === "UTM Source Platform") source.utmSourcePlatform = cleanLine(value, 500) || undefined;
    if (key === "UTM Creative Format") source.utmCreativeFormat = cleanLine(value, 500) || undefined;
    if (key === "UTM Marketing Tactic") source.utmMarketingTactic = cleanLine(value, 500) || undefined;
    if (key === "GCLID") source.gclid = cleanLine(value, 500) || undefined;
    if (key === "FBCLID") source.fbclid = cleanLine(value, 500) || undefined;
    if (key === "MSCLKID") source.msclkid = cleanLine(value, 500) || undefined;
    if (key === "All UTM Parameters") source.utmParameters = cleanUtmParameters(value) || undefined;
  });

  return { message: cleanMessage, source };
}

export function getLeadSourceLabel(source: LeadSource) {
  return source.sourcePath || source.sourceUrl || "Not tracked";
}

export function getLeadSourceHref(source: LeadSource) {
  return source.sourceUrl || source.sourcePath || "";
}
