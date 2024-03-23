<template>
  <Notification
    :isActive="notification.isActive"
    :severity="notification.severity"
    :messageContent="notification.messageContent"
    :timeIgnore="notification.timeIgnore"
    @isActive="setVisibilityOfNotification"
  />

  <!-- Step 1 -->

  <form @submit.prevent="createResetPasswordOtp">
    <Card style="width: 25em" v-if="step == 1">
      <template #header>
        <div class="logo">
          <i class="bx bx-home-smile"></i>
          <span>OpenGYS</span>
        </div>
      </template>
      <template #title>
        <i class="bx bx-arrow-back" @click="goToPreviousStep()"></i>
        <div style="margin-top: 15px">Parola Sıfırla</div>
      </template>
      <template #content>
        <div style="margin-top: 30px">
          <span class="p-float-label">
            <InputText class="input" size="small" v-model="email" />
            <label class="input">E-Posta*</label>
          </span>
        </div>
      </template>
      <template #footer>
        <div style="margin: 30px 0px 15px 0px">
          <div>
            <Button type="submit" style="width: 150px" label="Kod Gönder" />
          </div>
        </div>
      </template>
    </Card>
  </form>

  <!-- Step 2 -->

  <form @submit.prevent="validateResetPasswordOtp">
    <Card style="width: 25em" v-if="step == 2">
      <template #header>
        <div class="logo">
          <i class="bx bx-home-smile"></i>
          <span>OpenGYS</span>
        </div>
      </template>
      <template #title>
        <i class="bx bx-arrow-back" @click="goToPreviousStep()"></i>
        <div style="margin-top: 15px">Parola Sıfırla</div>
      </template>
      <template #content>
        <div style="margin-top: 30px">
          <span class="p-float-label">
            <InputText class="input" size="small" v-model="otp" />
            <label class="input">Kod*</label>
          </span>
        </div>
      </template>
      <template #footer>
        <div style="margin: 30px 0px 15px 0px">
          <div>
            <Button type="submit" style="width: 150px" label="Doğrula" />
          </div>
          <div style="margin-top: 10px">
            <a href="#">Kodu tekrar gönder</a>
          </div>
        </div>
      </template>
    </Card>
  </form>

  <!-- Step 3 -->

  <form @submit.prevent="resetPassword">
    <Card style="width: 25em" v-if="step == 3">
      <template #header>
        <div class="logo">
          <i class="bx bx-home-smile"></i>
          <span>OpenGYS</span>
        </div>
      </template>
      <template #title>
        <i class="bx bx-arrow-back" @click="goToPreviousStep()"></i>
        <div style="margin-top: 15px">Parola Sıfırla</div>
      </template>
      <template #content>
        <div style="margin-top: 30px">
          <span class="p-float-label">
            <Password
              class="input"
              v-model="newPassword"
              :feedback="false"
              :toggle-mask="true"
            />
            <label class="input">Yeni Parola*</label>
          </span>
        </div>
      </template>
      <template #footer>
        <div style="margin: 30px 0px 15px 0px">
          <div>
            <Button type="submit" style="width: 150px" label="Gönder" />
          </div>
          <div style="margin-top: 10px">
            <a href="#">Kodu tekrar gönder</a>
          </div>
        </div>
      </template>
    </Card>
  </form>
</template>

<script>
import Notification from "@/components/Notification.vue";
import * as NotificationConstants from "../assets/js/notificationConstants";
import { gysClient } from "@/assets/js/client.js";

export default {
  name: "ResetPasswordView",
  components: { Notification },
  data() {
    return {
      notification: {
        isActive: false,
        severity: "",
        messageContent: "",
        timeIgnore: false,
      },
      email: null,
      otp: null,
      newPassword: null,
      step: 1,
    };
  },
  methods: {
    setVisibilityOfNotification(event) {
      this.notification.isActive = event;
    },
    createResetPasswordOtp() {
      const payload = {
        email: this.email,
      };

      gysClient
        .post("users/create-reset-password-otp", payload)
        .then(() => {
          this.step = 2;

          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent = "Kod email adresinize gönderildi.";
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    validateResetPasswordOtp() {
      const payload = {
        email: this.email,
        otp: this.otp,
      };

      gysClient
        .post("users/validate-reset-password-otp", payload)
        .then(() => {
          this.step = 3;
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    resetPassword() {
      const payload = {
        email: this.email,
        password: this.newPassword,
      };

      gysClient
        .patch("users/reset-password", payload)
        .then(() => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent =
            "Parolanız başarılı bir şekilde değiştirildi, yönlendiriliyorsunuz.";

          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    goToPreviousStep() {
      if (this.step == 1) window.location.href = "/";
      else if (this.step == 2) {
        this.step = 1;

        this.email = null;
      } else if (this.step == 3) {
        this.email = null;
        this.otp = null;
        this.newPassword == null;

        this.step = 1;
      }
    },
  },
  mounted() {},
};
</script>

<style>
.reset-password-container {
  display: flex;
  justify-content: center;
}

.reset-password-container .logo {
  display: flex;
  align-items: center;
  color: #424242;
  overflow: hidden;
  font-weight: 500;
  justify-content: center;
  margin-top: -23px;
}
.reset-password-container .logo i {
  font-size: 2.9rem;
  margin-right: 5px;
}

.reset-password-container .logo span {
  font-size: 1.3rem;
}
</style>