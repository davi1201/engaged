<template>
  <div class="q-pa-md items-start q-gutter-md">
    <q-card class="my-card">
      <q-card-section horizontal>
         <q-skeleton v-show="!load" class="col-5" />
        <q-img
          class="col-5"
          v-show="load"
          :src="character.image"
        >
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ character.name }}
          </div>
        </q-img>

        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                <div v-show="!load">
                  <q-skeleton width="150px" />
                  <q-skeleton class="q-mt-sm" width="100px" />
                </div>
                <strong v-show="load">Status</strong> <span>{{ character.status }}</span>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <div v-show="!load">
                  <q-skeleton width="150px" />
                  <q-skeleton class="q-mt-sm" width="100px" />
                </div>
                <strong v-show="load">Espécie</strong> <span>{{ character.species }}</span>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <div v-show="!load">
                  <q-skeleton width="150px" />
                  <q-skeleton class="q-mt-sm" width="100px" />
                </div>
                <strong v-show="load">Gênero</strong> <span>{{ character.gender }}</span>
              </q-item-section>
            </q-item>
          </q-list>

          <div class="q-pa-md q-mt-sm">
            <q-skeleton v-show="!load" width="300px" />
            <h4 v-show="load">Episódios</h4>
            <q-skeleton v-show="!load" class="q-mt-lg" width="100" height="300px" />
              <!-- <strong v-for="(episode, key) in character.episode" :key="key">
                {{ episode.episode }} <span v-if="key < character.episode.length - 1"> || </span>
              </strong> -->
            <div v-show="load" v-for="(session, i) in sessionGroup" :key="i">
              <div class="q-mt-sm">
                <strong class="q-mt-lg">Temporada {{ i }}</strong>
              </div>
              <strong v-for="(item, index) in session" :key="index">
                <q-btn
                :to="{ name: 'Episode', params: { id: item.id } }"
                size="md"
                icon="theaters"
                color="primary"
                :label='`EP${item.episode}`'
                class="q-ma-sm">
                  <q-tooltip class="bg-info">{{ item.name }}</q-tooltip>
                </q-btn>
              </strong>
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import _ from 'lodash';
import GET_CHARACTER from '@/queries/character.gql';

export default {
  props: ['id'],
  data() {
    return {
      character: {
        name: '',
        status: '',
        species: '',
        gender: '',
        image: '',
        episode: [],
      },
      sessionGroup: [],
    };
  },
  setup() {
    return {
      load: false,
      session_regex: /^S?\d*\.\d+|[-]?\d+/g,
    };
  },
  methods: {
    async get() {
      const sessions = [];
      setTimeout(() => {
        this.$apollo.query({
          query: GET_CHARACTER,
          variables: {
            id: this.id,
          },
        }).then(({ data }) => {
          this.character = { ...data.character };

          this.character.episode.forEach((item) => {
            const episode = item.episode.match(this.session_regex);
            sessions.push({
              session: episode[0],
              episode: episode[1],
              name: item.name,
              id: item.id,
            });
          });

          this.sessionGroup = _.groupBy(sessions, 'session');
          this.load = true;
        }).catch((errors) => {
          console.log(errors.graphQLErrors);
        });
      }, 3000);
    },
  },
  mounted() {
    this.get();
  },
};
</script>
