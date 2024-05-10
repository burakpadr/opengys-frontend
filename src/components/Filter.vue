<template>
  <div class="base-filter">
    <div class="modal">
      <div class="element" v-for="(field, i) in fields" :key="i">
        <!-- Input Text -->

        <span class="p-float-label" v-if="field.type === 'TEXT'">
          <InputText
            class="input"
            v-model="field.fieldValue"
            size="medium"
            required="true"
          />
          <label class="input" for="İlan Yeri*">{{ field.fieldLabel }}</label>
        </span>

        <!-- Calendar -->

        <span class="p-float-label" v-if="field.type === 'CALENDAR'">
          <Calendar
            v-model="field.fieldValue"
            class="input"
            dateFormat="dd-mm-yy"
            showIcon
            iconDisplay="input"
          />
          <label for="inputType" class="input">{{ field.fieldLabel }}</label>
        </span>

        <!-- Input Number -->

        <span class="p-float-label" v-if="field.type === 'NUMBER'">
          <InputNumber
            v-model="field.fieldValue"
            :useGrouping="field.detail.useGrouping"
            :max="field.detail.max"
            :min="field.detail.min"
            class="input"
          />
          <label for="inputType" class="input">{{ field.fieldLabel }}</label>
        </span>

        <!-- Dropdowm -->

        <span class="p-float-label" v-if="field.type === 'DROPDOWN'">
          <Dropdown
            v-model="field.fieldValue"
            :options="field.detail.options"
            :optionLabel="field.detail.optionLabel"
            :optionValue="field.detail.optionalValue"
            class="w-full md:w-14rem input"
          />
          <label class="input">{{ field.fieldLabel }}</label>
        </span>
      </div>

      <div>
        <Button
          label="Filtrele"
          size="small"
          class="input"
          style="margin: 20px"
          @click="submitFilterForm"
        />
        <Button
          label="Temizle"
          size="small"
          class="input"
          style="margin: 20px"
          @click="clear"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filter",
  props: {
    fields: {
      default: [],
    },
  },
  data() {
    return {};
  },
  methods: {
    submitFilterForm() {
      let filterData = {};

      this.fields.forEach((field) => {
        filterData[field.fieldName] = field.fieldValue;
      });

      this.$emit("filterData", filterData);
    },
    clear() {
      this.fields.forEach((field) => {
        field.fieldValue = null;
      });
    },
  },
};
</script>

<style>
.base-filter {
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(102, 102, 102, 0.775);
  backdrop-filter: blur(10px);
  padding: 100px;
}

.base-filter .modal {
  width: 50%;
  height: 500px;
  background: #fafafa;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 10px;
}

.base-filter .modal .element {
  margin: 20px;
  display: inline-block;
}
</style>