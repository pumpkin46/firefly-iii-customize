<template>
  <div class="form-group" v-bind:class="{ 'has-error': error !== ''}">
    <div class="col-sm-12 text-sm">
      {{ label }}
    </div>
    <div class="col-sm-12">
      <div class="input-group">
        <input ref="descr" :title="label" :value="value"
        :type="type?type:'text'" autocomplete="off" class="form-control"
        name="description[]" v-bind:placeholder="placeholder"
        @input="handleInput" required: required />
        <span class="input-group-btn">
          <button
            class="btn btn-default"
            tabIndex="-1"
            type="button"
            v-on:click="clearDescription"
          >
            <i class="fa fa-trash-o"></i>
          </button>
        </span>
      </div>
    </div>
    <div class="text-danger col-sm-12" v-if="error !== ''">{{error}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["label", "type", "placeholder", "value", "requried", "error"],
  methods: {
    handleInput() {
      this.$emit("input", this.$refs.descr.value);
    },
    clearDescription: function () {
      this.description = '';
      this.$refs.descr.value = '';
      this.$emit('input', this.$refs.descr.value);
    },
  },
};
</script>