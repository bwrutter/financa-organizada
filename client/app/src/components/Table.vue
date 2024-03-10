<template>
  <div class="row">
    <q-input class="col" outlined v-model="name" label="Nome" />
    <q-input class="col" outlined v-model="value" label="Valor" />
    <q-btn color="primary" label="Salvar" @click="salvarNoLocalStorage()" />
  </div>
  <div class="q-pa-md">
    <q-table
      style="height: 400px; width: 400px"
      flat
      bordered
      title="Contas"
      :rows="rows"
      :columns="columns"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue'

  const columns: any = [
    { name: 'name',  label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'value', label: 'Value', field: 'value', align: 'left', sortable: true },
  ]

  export default  {
  data() {
    return {
        name: '',
      value: '',

      columns: [
        { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
        { name: 'value', label: 'Value', field: 'value', align: 'left', sortable: true },
      ],
      rows: [],

        pagination: ref({
          rowsPerPage: 0
        })
    };
  },
  watch: {

  },
  mounted() {
    this.carregarDoLocalStorage();
  },

  methods: {
    carregarDoLocalStorage() {
      const savedData = localStorage.getItem('contas-storage');
      if (savedData) {
        const savedArray = JSON.parse(savedData);
        this.rows = savedArray.map((item: any, index: any) => ({ ...item, index }));
      }
    },
     salvarNoLocalStorage() {
      const savedData = localStorage.getItem('contas-storage');
      const savedArray = savedData ? JSON.parse(savedData) : [];

      const dataToSave = {
        name: this.name,
        value: this.value,
      };

      savedArray.push(dataToSave);

      localStorage.setItem('contas-storage', JSON.stringify(savedArray));

      this.carregarDoLocalStorage();
    },
  },
}
</script>
