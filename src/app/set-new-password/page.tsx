
import { Suspense } from "react";
import SetNewPasswordPage from "./SetNewPasswordPage";

export default function Page() {
    return (
        <Suspense fallback={<div>Lädt...</div>}>
            <SetNewPasswordPage />
        </Suspense>
    );
}
