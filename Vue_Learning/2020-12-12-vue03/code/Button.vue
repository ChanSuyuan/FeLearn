<template>
  <div>
    <button @click="handleClick"><slot>按钮</slot></button>
  </div>
</template>

<script>
export default {
  name: "CButton",
  props: {
    disabled: {
      type: Boolean,
    },
  },
  methods: {
    handleClick() {
      if (this.disabled) return;
      this.$emit("click", 1);
    },
  },
};
</script>

<style></style>
