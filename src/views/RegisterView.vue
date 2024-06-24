<template>
  <Notification
    :isActive="notification.isActive"
    :severity="notification.severity"
    :messageContent="notification.messageContent"
    @isActive="setVisibilityOfNotification"
  />
  <form
    class="card flex align-items-center justify-content-center"
    @submit.prevent="signUp()"
  >
    <Card style="width: 25em">
      <template #header>
        <div class="logo">
          <i class="bx bx-home-smile"></i>
          <span>OpenGYS</span>
        </div>
      </template>
      <template #title>
        <div style="margin-top: 15px">Register</div>
      </template>
      <template #content>
        <div style="margin-top: 30px">
          <span class="p-float-label">
            <InputText class="input p-invalid" size="small" v-model="deedOwnerTitle" />
            <label class="input">Landlord Name*</label>
          </span>
          <span class="p-float-label" style="margin-top: 15px">
            <InputText class="input p-invalid" size="small" v-model="email" />
            <label class="input">E-Mail Address*</label>
          </span>
          <span class="p-float-label" style="margin-top: 15px">
            <Password
              class="input p-invalid"
              v-model="password"
              :feedback="false"
              :toggle-mask="true"
            />
            <label class="input">Password*</label>
          </span>
        </div>
      </template>
      <template #footer>
        <div style="margin: 30px 0px 15px 0px">
          <div>
            <Button type="submit" style="width: 100px" label="Register" />
          </div>
        </div>
      </template>
    </Card>
  </form>
</template>

<script>
import Notification from "@/components/Notification.vue";
import * as NotificationConstants from "../assets/js/notificationConstants";
import { gysClient } from "@/assets/js/client";

export default {
  name: "RegisterView",
  components: { Notification },
  data() {
    return {
      deedOwnerTitle: null,
      email: null,
      password: null,
      notification: {
        isActive: false,
        severity: "",
        messageContent: "",
      },
    };
  },
  methods: {
    setVisibilityOfNotification(event) {
      this.notification.isActive = event;
    },
    formIsValid() {
      if (!this.deedOwnerTitle) {
        return false;
      }

      if (!this.email) {
        return false;
      }

      if (!this.password) {
        return false;
      }

      return true;
    },
    signUp() {
      if (this.formIsValid()) {
        const payload = {
          user: {
            name: this.deedOwnerTitle,
            email: this.email,
            password: this.password,
          },
          isDeedOwner: true,
        };

        gysClient
          .post("staffs", payload)
          .then(() => {
            this.notification.isActive = true;
            this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
            this.notification.messageContent = "Kaydınız oluşuturldu.";

            setInterval(() => {
              window.location.href = "/";
            }, 2000)
          })
          .catch((error) => {
            this.notification.isActive = true;
            this.notification.severity = NotificationConstants.SEVERITY_ERROR;
            this.notification.messageContent = error.response.data.message;
          });
      }
    },
  },
  mounted() {},
};
</script>

<style>
.register-container {
  display: flex;
  justify-content: center;
}

.register-container .logo {
  display: flex;
  align-items: center;
  color: #424242;
  overflow: hidden;
  font-weight: 500;
  justify-content: center;
  margin-top: -23px;
}
.register-container .logo i {
  font-size: 2.9rem;
  margin-right: 5px;
}

.register-container .logo span {
  font-size: 1.3rem;
}
</style>