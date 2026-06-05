import Swal, { type SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Alert = withReactContent(Swal);

export async function ErrWarnAlert(title: string, text: string, icon: SweetAlertIcon, btnText = "CLOSE") {
    const { isConfirmed, isDismissed, isDenied, dismiss, value } = await Alert.fire({
        title,
        text,
        icon,
        confirmButtonText: btnText,
        confirmButtonColor: "#d33333",
        showCancelButton: false,
        // allowOutsideClick: false,
    });
    return { isConfirmed, isDismissed, isDenied, dismiss, value };
}

export async function SuccessAlert(title: string, text: string, icon: SweetAlertIcon, btnText = "CLOSE") {
    const { isConfirmed, isDismissed, isDenied, dismiss, value } = await Alert.fire({
        title,
        text,
        icon,
        confirmButtonText: btnText,
        confirmButtonColor: "#1b75bb",
        showCancelButton: false,
        // allowOutsideClick: false,
    });
    return { isConfirmed, isDismissed, isDenied, dismiss, value };
}

export async function QuestionAlert(title: string, text: string, icon: SweetAlertIcon, btnText = "CLOSE") {
    const { isConfirmed, isDismissed, isDenied, dismiss, value } = await Alert.fire({
        title,
        text,
        icon,
        confirmButtonText: btnText,
        confirmButtonColor: "#1b75bb",
        cancelButtonColor: "#D33333",
        cancelButtonText: "CANCEL",
        showCancelButton: true,
        // allowOutsideClick: false,
    });
    return { isConfirmed, isDismissed, isDenied, dismiss, value };
}