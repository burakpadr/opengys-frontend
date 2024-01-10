<template>
  <Notification
    :isActive="notification.isActive"
    :severity="notification.severity"
    :messageContent="notification.messageContent"
    @isActive="setVisibilityOfNotification"
  />
  <div class="card flex align-items-center justify-content-center">
    <Card style="width: 30em">
      <template #header>
        <div class="logo">
          <i class="bx bx-home-smile"></i>
          <span>OpenGYS</span>
        </div>
      </template>
      <template #title>
        <div style="margin-top: 15px">Giriş</div>
      </template>
      <template #content>
        <div style="margin-top: 30px">
          <span class="p-float-label" style="margin: 0 auto">
            <InputText
              class="input"
              size="small"
              v-model="email"
              required="true"
            />
            <label class="input">E-Posta</label>
          </span>
          <span class="p-float-label" style="margin-top: 15px">
            <Password
              class="input"
              v-model="password"
              :feedback="false"
              :toggle-mask="true"
            />
            <label class="input">Password</label>
          </span>
        </div>
      </template>
      <template #footer>
        <div style="margin: 30px 0px 15px 0px">
          <div>
            <Button style="width: 100px" label="Giriş" @click="signIn()"/>
          </div>
          <div style="margin-top: 10px">
            <a href="#">Şifremi unuttum</a>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import * as NotificationConstants from "../assets/js/notificationConstants";
import { getTokenFromBackend, setTokenToLocalStorage } from "@/service/TokenService";

export default {
  name: "LoginView",
  components: { Notification },
  data() {
    return {
      email: null,
      password: null,
      notification: {
        isActive: false,
        severity: "",
        messageContent: "",
      }
    };
  },
  methods: {
    setVisibilityOfNotification(event) {
      this.notification.isActive = event;
    },
    signIn() {
      getTokenFromBackend(this.email, this.password)
      .then((response) => {
        setTokenToLocalStorage(response.headers.authorization);

        window.location.href = "/real-estates";
      })
      .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    }
  }
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
}

.login-container .logo {
  display: flex;
  align-items: center;
  color: #424242;
  overflow: hidden;
  font-weight: 500;
  justify-content: center;
  margin-top: -23px;
}
.login-container .logo i {
  font-size: 2.9rem;
  margin-right: 5px;
}

.login-container .logo span {
  font-size: 1.3rem;
}
</style>