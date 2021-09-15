<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>
            <img src="@/assets/images/logo-engaged.png" id="logo" alt="">
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="!drawer || miniState"
        @click.capture="drawerClick"

        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item :to="{ name: 'Characters' }" clickable exact>
              <q-item-section avatar>
                <q-icon name="group" />
              </q-item-section>

              <q-item-section>
                Personagens
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
        <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
          <q-btn
            dense
            round
            unelevated
            color="accent"
            icon="chevron_left"
            @click="miniState = true"
          />
        </div>
      </q-drawer>

      <q-page-container>
        <q-page class="q-px-lg q-py-md">
          <router-view/>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { ref } from 'vue';
import bg from '@/assets/images/bg.jpg';

export default {
  name: 'LayoutDefault',
  setup() {
    const miniState = ref(false);
    return {
      drawer: ref(false),
      image: bg,
      miniState,
      drawerClick(e) {
        if (miniState.value) {
          miniState.value = false;
          e.stopPropagation();
        }
      },
    };
  },
};
</script>

<style lang="css">
#logo {
  width: 130px;
}
</style>
