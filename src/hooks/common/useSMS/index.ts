import * as SMS from "expo-sms";
import { useEffect, useState } from "react";

interface useSMSProps {
  addresses: string | string[];
  message: string;
  options?: SMS.SMSOptions;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onCancel?: () => void;
  enable?: boolean;
}

const useSMS = ({
  addresses,
  message,
  options,
  onSuccess,
  onCancel,
  onError,
  enable,
}: useSMSProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [sendStatus, setSendStatus] = useState<
    "sent" | "cancelled" | "failed" | null
  >(null);

  const goSMS = () => {
    if (!enable) return;
    (async () => {
      const isAvailable = await SMS.isAvailableAsync();
      setIsLoading(true);

      if (isAvailable) {
        setIsAvailable(true);
        const { result } = await SMS.sendSMSAsync(addresses, message, options);

        if (result === "sent") {
          console.log("SMS sent successfully");
          setSendStatus("sent");
          onSuccess && onSuccess();
          setIsLoading(false);
        }
        if (result === "cancelled") {
          console.log("SMS sending was cancelled");
          setSendStatus("cancelled");
          onCancel && onCancel();
          setIsLoading(false);
        } else {
          console.log("SMS sending failed");
          setSendStatus("failed");
          onError && onError(new Error("SMS sending failed"));
          setIsLoading(false);
        }
      } else {
        // 해당 기기에서 SMS를 사용할 수 없습니다.
      }
    })();
  };

  return {
    isLoading,
    isAvailable,
    sendStatus,
    goSMS,
  };
};

export default useSMS;
