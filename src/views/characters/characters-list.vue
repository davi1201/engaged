<template>
  <div class="q-pa-md">
   <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <i class="fas fa-filter"></i>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <strong>Filtros</strong>
        </q-item-section>
      </q-item>

      <q-separator />
      <div class="q-ma-xl">
        <q-form @submit="getAll" class="q-gutter-md">
          <q-input
            name="name"
            v-model="filters.name"
            color="primary"
            label="Nome"
            outlined
          />

          <div>
            <q-btn label="Pesquisar" icon="search" type="submit" color="primary"/>
            <q-btn
            label="Limpar Filtros"
            icon="clear"
            @click="clearFilters"
            class="q-ml-lg"
            type="button"
            color="red"/>
          </div>
        </q-form>
      </div>
    </q-card>
    <q-table
      class="q-mt-xl"
      title="Personagens"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td key="actions" :props="props">
          <q-btn
          v-if="props"
          :to="{ name: 'Character', params: { id: props.row.id } }"
          color="secondary"
          icon="person">
            Visualizar
          </q-btn>
        </q-td>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import CharacterService from '@/services/CharacterService';
import GET_ALL from '@/queries/characters.gql';

export default {
  name: 'Characters List',
  data() {
    return {
      rows: [],
      loading: true,
      filters: {
        name: '',
      },
    };
  },

  setup() {
    return {
      quasar: useQuasar(),
      columns: CharacterService.getColumsTable(),
    };
  },

  methods: {
    async getAll() {
      this.loading = true;
      this.$apollo.query({
        query: GET_ALL,
        variables: {
          name: this.filters.name,
        },
      }).then(({ data }) => {
        this.loading = false;
        this.rows = data.characters.results.map((item) => ({
          id: item.id,
          name: item.name,
          species: item.species,
          status: item.status,
        }));
      }).catch((errors) => {
        console.log(errors.graphQLErrors);
        this.loading = false;
        this.quasar.notify({
          message: 'Não foram encontrados resultados para a pesquisa. Tente novamente.',
          color: 'red',
        });
      });
    },

    clearFilters() {
      this.filters.name = '';
      this.getAll();
    },
  },
  created() {
    this.getAll();
  },
};
</script>
