<template>
  <Toast />
</template>

<script>
export default {
  name: "Notification",
  props: ["isActive", "severity", "messageContent", "timeIgnore"],
  watch: {
    isActive() {
      if (this.isActive)
        this.$toast.add({
          severity: this.severity,
          summary: "Bildirim",
          detail: this.messageContent,
          life: this.timeIgnore ? null : 3000,
        });

        this.$emit("isActive", false);
    },
  },
};
</script>