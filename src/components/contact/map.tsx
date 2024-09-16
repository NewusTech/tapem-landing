import React from "react";

type MapProps = {
  latitude: string;
  longitude: string;
};
export default function Map({ latitude, longitude }: MapProps) {
  return (
    <div className="mt-6">
      <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63611.49278011671!2d104.83351522607362!3d-4.818356635752443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e38a8db7600d4a5%3A0x30e59ab77a3b8568!2sTaman%20Sahabat%20Kotabumi!5e0!3m2!1sid!2sid!4v1726109946134!5m2!1sid!2sid"

        width="600"
        height="450"
        loading="lazy"
        className="w-full"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
}
