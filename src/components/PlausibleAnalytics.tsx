// Plausible Analytics für Next.js (ohne Cookies, DSGVO-freundlich)
import Script from "next/script";

export default function PlausibleAnalytics() {
    return (
        <Script
            strategy="afterInteractive"
            data-domain="kaderupdate.com"
            src="https://plausible.io/js/plausible.js"
        />
    );
}
