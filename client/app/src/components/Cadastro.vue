<template>
  <v-app>
    <v-container>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nome"
          required
        ></v-text-field>
        <v-text-field
          v-model="value"
          :rules="valueRules"
          label="Valor (Preço)"
          required
        ></v-text-field>
        <v-btn color="success" class="mr-4" @click="save">
          Salvar
        </v-btn>
        <v-btn color="error" @click="clear">
          Excluir
        </v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const valid = ref(true);
    const name = ref('');
    const nameRules = [
(      v: any) => !!v || 'Nome é obrigatório.',
    ];
    const value = ref('');
    const valueRules = [
(      v: any) => !!v || 'Valor é obrigatório.',
    ];

    const save = () => {
      if (valid.value) {
        // Salvar dados
        alert(`Nome: ${name.value}, Valor: ${value.value}`);
      }
    };

    const clear = () => {
      name.value = '';
      value.value = '';
    };

    return {
      valid,
      name,
      nameRules,
      value,
      valueRules,
      save,
      clear,
    };
  },
};
</script>
