<template>
  <Toast />
</template>

<script>
export default {
  name: "Notification",
  props: ["isActive", "severity", "messageContent"],
  watch: {
    isActive() {
      if (this.isActive)
        this.$toast.add({
          severity: this.severity,
          summary: "Bildirim",
          detail: this.messageContent,
          life: 3000,
        });

        this.$emit("isActive", false);
    },
  },
};
</script>