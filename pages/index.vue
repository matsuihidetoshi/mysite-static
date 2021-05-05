<template>
  <div
    class="mb-9"
  >
    <v-card>
      <v-row>
        <v-col
          cols="4"
          align="center"
        >
          <v-avatar
            size="97"
            class="
              ml-4
              mt-2
            "
          >
            <v-img src="/profile.png" />
          </v-avatar>
        </v-col>

        <v-col
          cols="8"
        >
          <v-card-title
            class="font-weight-bold"
          >
            Matsui Hidetoshi
          </v-card-title>

          <v-card-subtitle>
            Web Developer

            <br>

            <v-icon
              class="mb-1"
            >
              {{ mdiGithub }}
            </v-icon>

            <a
              href="https://github.com/matsuihidetoshi"
              target="_blank"
            >
              matsuihidetoshi
            </a>
          </v-card-subtitle>
        </v-col>
      </v-row>
    </v-card>

    <latest />

    <new-knowledge />

    <v-row>
      <v-col
        v-for="(item, index) in displayItems"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        class="pb-0"
      >
        <v-card
          height="100%"
          :to="item.link"
        >
          <v-img
            v-if="item.image"
            height="200"
            :src="item.image"
          />
          <v-card-title
            class="
              headline
              font-weight-bold
            "
          >
            {{ item.title }}
          </v-card-title>

          <v-card-text>
            <p
              v-for="(line, lineIndex) in item.lines"
              :key="lineIndex"
              class="mb-1"
            >
              {{ line }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        xs="12"
        sm="6"
        md="4"
        class="pb-0"
      >
        <v-card
          height="100%"
        >
          <v-img
            src="/mysite_qr.png"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mdiGithub } from '@mdi/js'
import Latest from '../components/contents/Latest.vue'
import NewKnowledge from '../components/contents/NewKnowledge.vue'
import { items, Item } from '../data/items'

@Component({
  components: {
    Latest,
    NewKnowledge
  }
})
export default class Index extends Vue {
  mdiGithub = mdiGithub
  items = items
  contents = []

  get displayItems () {
    return this.items.filter((item: Item) => { return item.tile })
  }
}
</script>
