export type LeadSource = {
  formType?: string;
  sourcePath?: string;
  sourceUrl?: string;
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

function pathFromUrl(sourceUrl: string) {
  if (!sourceUrl) return "";

  try {
    const url = new URL(sourceUrl);
    return `${url.pathname}${url.search}`;
  } catch {
    return "";
  }
}

export function getBrowserLeadSource(): Pick<LeadSource, "sourcePath" | "sourceUrl"> {
  if (typeof window === "undefined") return {};

  return {
    sourcePath: `${window.location.pathname}${window.location.search}`,
    sourceUrl: window.location.href,
  };
}

export function readLeadSource(
  payload: Record<string, unknown>,
  formType: string,
  fallbackUrl?: string | null
): LeadSource {
  const sourceUrl = cleanSourceUrl(payload.sourceUrl) || cleanSourceUrl(fallbackUrl);
  const sourcePath = cleanSourcePath(payload.sourcePath) || cleanSourcePath(pathFromUrl(sourceUrl));

  return {
    formType: cleanLine(formType, 120),
    sourcePath: sourcePath || undefined,
    sourceUrl: sourceUrl || undefined,
  };
}

export function appendLeadSourceToMessage(message: string, source: LeadSource) {
  const entries = [
    source.formType ? `Form: ${source.formType}` : "",
    source.sourcePath ? `Page: ${source.sourcePath}` : "",
    source.sourceUrl ? `URL: ${source.sourceUrl}` : "",
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
  });

  return { message: cleanMessage, source };
}

export function getLeadSourceLabel(source: LeadSource) {
  return source.sourcePath || source.sourceUrl || "Not tracked";
}

export function getLeadSourceHref(source: LeadSource) {
  return source.sourceUrl || source.sourcePath || "";
}
