<template>
  <div>
    <v-card>
      <v-row>
        <v-col
          cols="4"
          align="center"
        >
          <v-avatar
            class="ml-5"
            size="90"
          >
            <v-img src="/profile.png" />
          </v-avatar>
        </v-col>

        <v-col
          cols="8"
        >
          <div
            class="
              text-left
              ma-1
            "
          >
            <emerge-text
              message="Matsui"
              class="
                d-inline-block
                font-weight-bold
                text-h5
              "
            />

            <emerge-text
              message="Hidetoshi"
              class="
                d-inline-block
                font-weight-bold
                text-h5
              "
            />

            <emerge-text
              message="Web Developer"
            />

            <v-icon
              class="mb-1"
            >
              mdi-github
            </v-icon>

            <a
              href="https://github.com/matsuihidetoshi"
              target="_blank"
            >
              <emerge-text
                message="matsuihidetoshi"
                class="d-inline-block"
              />
            </a>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <latest />

    <v-row>
      <v-col
        v-for="(description, index) in descriptions"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        class="pb-0"
      >
        <v-card
          height="100%"
          :to="description.link"
        >
          <v-img
            v-if="description.image"
            height="200"
            :src="description.image"
          />
          <v-card-title
            class="
              headline
              font-weight-bold
            "
          >
            <emerge-text :message="description.title" />
          </v-card-title>

          <v-card-text>
            <p
              v-for="(line, lineIndex) in description.lines"
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
<script>
import { Component, Vue } from 'nuxt-property-decorator'
import EmergeText from '~/components/EmergeText.vue'
import Latest from '~/components/contents/Latest.vue'
import descriptions from '~/data/descriptions.json'

@Component({
  components: {
    EmergeText,
    Latest
  },
  data () {
    return {
      descriptions,
      contents: []
    }
  }
})

export default class Index extends Vue { }
</script>
