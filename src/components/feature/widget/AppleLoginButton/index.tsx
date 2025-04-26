import * as AppleAuthentication from "expo-apple-authentication";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

const AppleLoginButton = () => {
  const login = useCallback(async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log(credential);
      // signed in
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  }, []);

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={styles.button}
      onPress={login}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 42,
  },
});

export default AppleLoginButton;
/*

{
   "authorizationCode":"cea6b51d1b03841b6be6a171ddd86de8c.0.pzru.0fKWxZMrcu5lpxwZR2M6Qw",
   "email":"bc49dhtsn7@privaterelay.appleid.com",
   "fullName":{
      "familyName":"박",
      "givenName":"건규",
      "middleName":null,
      "namePrefix":null,
      "nameSuffix":null,
      "nickname":null
   },
   "identityToken":"eyJraWQiOiJFNnE4M1JCMTVuIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiaG9zdC5leHAuRXhwb25lbnQiLCJleHAiOjE3NDU3MzgzNDYsImlhdCI6MTc0NTY1MTk0Niwic3ViIjoiMDAwOTE0LjNlODE2ODM0MjVmMTRiN2RhNDYzNzEzODRiODRlZDNiLjA3MTkiLCJjX2hhc2giOiJwOXI2UUNIWlphMU5YTjVuay1rWGFnIiwiZW1haWwiOiJiYzQ5ZGh0c243QHByaXZhdGVyZWxheS5hcHBsZWlkLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE3NDU2NTE5NDYsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZSwicmVhbF91c2VyX3N0YXR1cyI6Mn0.jxIj-GwihATKHdA75ChhFCfo8fx0R1Jk2Kdl1D8ieQJF-sqPX6t8VSDiHRhfwJJFgtBQBWNFiZEGHRN8lIFlSlUbRS_FJNNRYbK2l9XHtK7AF5qj7k1QLcnPpm3z_Q-06qWD4gzFxwp2AxxmRFvFMdHg1LQmd_Erw7AOXkmYX_AhI0AmMEQwR988Xj_brIlbMGiT1tMNnFEzBSJcQssB_4u5EjfwCSuPASIlNr9OPrTm9y4j8MQmCzrcmO3gcX_FoDxVrqYK8O53OJZ2QnP_VKYCl8DxjXUb8ug-oinKqk6deZZAWwBEBPlHva4ZvAvvzE0IUL9is55gyBlQyJZpAg",
   "realUserStatus":2,
   "state":null,
   "state":null,
   "user":"000914.3e81683425f14b7da46371384b84ed3b.0719"
}
*/
