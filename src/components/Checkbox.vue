<template>
  <div class="checkbox">
    <label class="checkbox__label">
      <input type="checkbox" :checked="isChecked" :value="value" @change="updateInput" />
      <span class="checkbox__mark"></span>
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',

  model: {
    prop: 'modelValue',
    event: 'change'
  },

  props: {
    value: { type: Number },
    modelValue: { default: '' },
    label: { type: String, required: true },
    trueValue: { default: true },
    falseValue: { default: false }
  },

  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }

      return this.modelValue === this.trueValue
    }
  },
  
  methods: {
    updateInput(event) {
      const isChecked = event.target.checked

      if (this.modelValue instanceof Array) {
        const newValue = [...this.modelValue]

        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.checkbox {
  &__label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 13px;
    user-select: none;
    padding: 10px 20px;

    &:hover {
      background-color: $hoverColor;
    }

    input {
      display: none;

      &:checked~.checkbox__mark {
        border-color: $blueMain;

        &:after {
          display: block;
        }
      }
    }
  }

  &__mark {
    height: 20px;
    width: 20px;
    border-radius: 2px;
    border: 1px solid $blueMain;
    position: relative;
    margin-right: 10px;

    &:after {
      content: "";
      position: absolute;
      display: none;
      left: 6px;
      top: 1px;
      width: 5px;
      height: 10px;
      border: solid #2196F3;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
}
</style>
