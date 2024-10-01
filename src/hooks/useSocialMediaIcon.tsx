import { Share2, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

type useSocialMediaIcon = {
  name: "facebook" | "instagram" | "linkedin" | "twitter" | string;
  isMobile?: boolean;
};
export default function UseSocialMediaIcon({
  name,
  isMobile,
}: useSocialMediaIcon) {
  switch (name) {
    case "facebook":
      return <Facebook size={isMobile ? 14 : 24} />;
    case "instagram":
      return <Instagram size={isMobile ? 14 : 24} />;
    case "linkedin":
      return <Linkedin size={isMobile ? 14 : 24} />;
    case "twitter":
      return <Twitter size={isMobile ? 14 : 24} />;
    default:
      return <Share2 />;
  }
}
