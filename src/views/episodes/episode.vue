<template>
  <div>
     <q-card bordered class="bg-grey-1 my-card">
      <q-card-section>
        <div v-show="!load">
          <q-skeleton width="300px" />
          <q-skeleton class="q-mt-sm" width="200px" />
        </div>
        <div v-show="load" class="text-h6">{{ episode.name }}</div>
        <div v-show="load" class="text-subtitle2">Data: {{ episode.air_date }}</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-skeleton v-show="!load" width="300px" height="45px" />
        <h4 v-show="load">Personagens</h4 >
        <div class="q-mt-md">
          <div class="q-col-gutter-lg row items-start">
            <div v-show="!load" class="col-3" v-for="index in 8" :key="index">
              <q-skeleton width="100" height="263px" />
            </div>
            <div
            v-show="load"
            class="col-3"
            v-for="(character, index) in episode.characters" :key="index">
              <router-link :to="{ name: 'Character', params: { id: character.id } }">
                <q-img :src="character.image">
                  <div class="absolute-bottom text-subtitle1 text-center">
                    {{ character.name }}
                  </div>
                </q-img>
              </router-link>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import GET_EPISODE from '@/queries/episode.gql';

export default {
  props: ['id'],
  data() {
    return {
      episode: {
        id: '',
        name: '',
        air_date: '',
        episode: '',
        characters: [],
      },
    };
  },
  setup() {
    return {
      load: false,
    };
  },
  methods: {
    async get() {
      setTimeout(() => {
        this.$apollo.query({
          query: GET_EPISODE,
          variables: {
            id: this.id,
          },
        }).then(({ data }) => {
          this.load = true;
          this.episode = { ...data.episode };
        }).catch((errors) => {
          this.load = true;
          console.log(errors.graphQLErrors);
        });
      }, 3000);
    },
  },
  created() {
    this.get();
  },
};
</script>
