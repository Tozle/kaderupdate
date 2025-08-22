"use client";
import CookieNotice from "./CookieNotice";
import { useCallback } from "react";

export default function CookieNoticeClient() {
    const handleAccept = useCallback(() => {
        localStorage.setItem("cookie-accepted", "1");
    }, []);
    return <CookieNotice onAccept={handleAccept} />;
}
