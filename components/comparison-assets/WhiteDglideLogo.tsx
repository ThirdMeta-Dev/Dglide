import Image from "next/image";
import dglideWhiteLogo from "./zoho/dglide-white-logo.png";

export default function WhiteDglideLogo() {
  return (
    <Image
      src={dglideWhiteLogo}
      alt="DGlide"
      width={184}
      height={40}
      style={{ display: "block", width: 184, height: 40, objectFit: "contain" }}
    />
  );
}
