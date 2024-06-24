<template>
  <div class="stepper">
    <div class="bracket">
      <div class="step" v-for="(step, i) in this.options.steps" :key="i" :class="{'active': step.isActive}">
        <div class="circle" @click="changeStep(i)"></div>
        <div class="label">{{ $t(step.i18nCode) }}</div>
      </div>
    </div>
    <div class="bracket"></div>
  </div>
</template>

<script>
export default {
  name: "Stepper",
  props: {
    options: {
      steps: [],
    },
  },
  methods: {
    changeStep(stepIndex) {
      this.options.steps.filter(step => step.isActive)[0].isActive = false;

      this.options.steps[stepIndex].isActive = true;

      this.$emit("stepState", this.options.steps[stepIndex]);
    }
  }
};
</script>

<style>
.stepper {
  width: 100%;
  height: 60px;
}

.stepper .bracket {
  width: 100%;
  height: 50%;
  position: relative;
  top: 0;
  left: 0;
  border-bottom: 1px solid #d4d4d4;
  display: flex;
}

.stepper .bracket:nth-child(2) {
  border-bottom: none;
}

.stepper .bracket .step {
  margin: auto;
  margin-top: 15px;
}

.stepper .bracket .step .circle {
  width: 30px;
  height: 30px;
  margin: auto;
  border-radius: 50%;
  background-color: #d4d4d4;
  cursor: pointer;
}

.stepper .bracket .step.active .circle {
  background-color: #4b62a1;
}

.stepper .bracket .step .label {
  text-align: center;
  margin-top: 10px;
  color: #d4d4d4;
}
</style>