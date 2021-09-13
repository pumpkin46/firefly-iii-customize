<template>
  <div class="form-group" v-bind:class="{ 'has-error': hasError()}">
    <div class="col-sm-12 text-sm">
      {{ $t('firefly.description') }}
    </div>
    <div class="col-sm-12">
      <div class="input-group">
        <input
            ref="descr"
            :title="$t('firefly.description')"
            :value="value"
            autocomplete="off"
            class="form-control"
            name="description[]"
            type="text"
            v-bind:placeholder="$t('firefly.description')"
            @input="handleInput"
            v-on:keypress="handleEnter" v-on:submit.prevent
        >
        <span class="input-group-btn">
            <button
                class="btn btn-default"
                tabIndex="-1"
                type="button"
                v-on:click="clearDescription"><i class="fa fa-trash-o"></i></button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error', 'value', 'index'],
  name: "TransactionDescription",
  mounted() {
    this.target = this.$refs.descr;
    this.descriptionAutoCompleteURI = document.getElementsByTagName('base')[0].href + "api/v1/autocomplete/transactions?query=";
    this.$refs.descr.focus();
    console.log(this.value)
  },
  components: {},
  data() {
    return {
      descriptionAutoCompleteURI: null,
      name: null,
      description: null,
      target: null,
    }
  },
  methods: {
    aSyncFunction: function (query, done) {
      axios.get(this.descriptionAutoCompleteURI + query)
          .then(res => {
            done(res.data);
          })
          .catch(err => {
            // any error handler
          })
    },
    betterHighlight: function (item) {
      var inputValue = this.$refs.descr.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      var escapedName = this.escapeHtml(item.description);
      return escapedName.replace(new RegExp(("" + inputValue), 'i'), '<b>$&</b>');
    },
    escapeHtml: function (string) {

      let entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
      };

      return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
        return entityMap[s];
      });

    },
    search: function (input) {
      return ['ab', 'cd'];
    },
    hasError: function () {
      return this.error.length > 0;
    },
    clearDescription: function () {
      //props.value = '';
      this.description = '';
      this.$refs.descr.value = '';
      this.$emit('input', this.$refs.descr.value);
      // some event?
      this.$emit('clear:description')
    },
    handleInput(e) {
      this.$emit('input', this.$refs.descr.value);
    },
    handleEnter: function (e) {
      // todo feels sloppy

      if (e.keyCode === 13) {
        //e.preventDefault();
      }
    },
    selectedItem: function (e) {
      if (typeof this.name === 'undefined') {
        return;
      }
      if (typeof this.name === 'string') {
        return;
      }
      this.$refs.descr.value = this.name.description;
      this.$emit('input', this.$refs.descr.value);
    },
  }
}
</script>
