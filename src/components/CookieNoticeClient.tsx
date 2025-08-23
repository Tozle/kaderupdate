"use client";
import CookieNotice from "./CookieNotice";
import { useCallback, useEffect, useState } from "react";

export default function CookieNoticeClient() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem("cookie-accepted")) setVisible(true);
    }, []);
    const handleAccept = useCallback(() => {
        localStorage.setItem("cookie-accepted", "1");
        setVisible(false);
    }, []);
    if (!visible) return null;
    return <CookieNotice onAccept={handleAccept} />;
}
