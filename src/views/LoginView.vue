<template>
  <Notification
    :isActive="notification.isActive"
    :severity="notification.severity"
    :messageContent="notification.messageContent"
    @isActive="setVisibilityOfNotification"
  />
  <form
    class="card flex align-items-center justify-content-center"
    @submit.prevent="signIn()"
    v-if="loginModalIsVisible"
  >
    <Card style="width: 25em">
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
          <span class="p-float-label">
            <InputText class="input" size="small" v-model="email" />
            <label class="input">E-Posta*</label>
          </span>
          <span class="p-float-label" style="margin-top: 15px">
            <Password
              class="input"
              v-model="password"
              :feedback="false"
              :toggle-mask="true"
            />
            <label class="input">Parola*</label>
          </span>
        </div>
      </template>
      <template #footer>
        <div style="margin: 30px 0px 15px 0px">
          <div>
            <Button type="submit" style="width: 100px" label="Giriş" />
          </div>
          <div style="margin-top: 10px">
            <a href="#" @click="openResetPasswordModal()">Şifremi unuttum</a>
          </div>
        </div>
      </template>
    </Card>
  </form>
  <div class="card flex align-items-center justify-content-center" v-else>
    <ResetPasswordView />
  </div>
</template>

<script>
import RealEstateListView from "./RealEstateListView.vue";
import PaymentDeclarationTenantView from "./PaymentDeclarationTenantView.vue";
import Notification from "@/components/Notification.vue";
import * as NotificationConstants from "../assets/js/notificationConstants";
import {
  getTokenFromBackend,
  setTokenToLocalStorage,
  removeToken,
  parseToken,
} from "@/service/TokenService";
import ResetPasswordView from "./ResetPasswordView.vue";

export default {
  name: "LoginView",
  components: { Notification, ResetPasswordView },
  data() {
    return {
      email: null,
      password: null,
      notification: {
        isActive: false,
        severity: "",
        messageContent: "",
      },
      loginModalIsVisible: true,
    };
  },
  methods: {
    setVisibilityOfNotification(event) {
      this.notification.isActive = event;
    },
    signIn() {
      removeToken();

      getTokenFromBackend(this.email, this.password)
        .then((response) => {
          setTokenToLocalStorage(response.headers.authorization);

          let decodedJwt = parseToken();

          let url = "/";

          if (decodedJwt.isStaff) {
            url = this.$router
              .getRoutes()
              .find(
                (r) => r.components.default.name === RealEstateListView.name
              ).path;
          } else if (decodedJwt.isTenant) {
            

            url = this.$router
              .getRoutes()
              .find(
                (r) => r.components.default.name === PaymentDeclarationTenantView.name
              ).path;
          }

          window.location.href = url;
        })
        .then(() => {
          if (window.PasswordCredential) {
            const passwordCredential = new PasswordCredential({
              id: this.email,
              password: this.password,
            });
            navigator.credentials.store(passwordCredential);
          }
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    openResetPasswordModal() {
      this.loginModalIsVisible = false;
    },
  },
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