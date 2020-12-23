<template>
  <div>
    <v-row
      class="
        text-center
        pa-3
      "
    >
      <v-col
        cols="12"
      >
        <h1>
          お問い合わせ
        </h1>

        <v-card
          class="
            mt-3
            pa-4
          "
        >
          <v-form
            v-model="valid"
          >
            <v-text-field
              v-model="title.value"
              :rules="title.rules"
              :label="title.label"
            />

            <v-text-field
              v-model="contact.value"
              :rules="contact.rules"
              :label="contact.label"
            />

            <v-textarea
              v-model="content.value"
              :rules="content.rules"
              :label="content.label"
            />

            <p>下記プライバシーポリシーにご同意いただきました上、お問い合わせください。</p>

            <PrivacyPolicy />

            <v-btn
              block
              color="primary"
              class="
                font-weight-bold
                mt-3
              "
              @click="dialog = true"
            >
              同意して送信する
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-spacer />

      <v-btn
        to="/"
        class="
          mt-2
          mr-6
          mb-9
        "
      >
        back
      </v-btn>
    </v-row>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card
        v-if="valid"
        class="pa-3"
      >
        <v-card-text
          class="pt-5"
        >
          <h4>
            {{ title.label }}
          </h4>

          <p>
            {{ title.value }}
          </p>

          <h4>
            {{ contact.label }}
          </h4>

          <p>
            {{ contact.value }}
          </p>

          <h4>
            {{ content.label }}
          </h4>

          <p
            class="
              breakLine
              contentPreview
            "
          >
            {{ content.value }}
          </p>
        </v-card-text>

        <v-btn
          class="
            secondary
            font-weight-bold
          "
          @click="dialog = false"
        >
          戻る
        </v-btn>

        <v-btn
          class="
            primary
            font-weight-bold
            float-right
          "
          @click="post(); dialog = false"
        >
          送信
        </v-btn>
      </v-card>

      <v-card
        v-if="!valid"
        class="pa-3"
      >
        <v-card-text
          class="pt-5"
        >
          お問い合わせ内容を正しく入力してください。
        </v-card-text>

        <v-btn
          class="
            warning
            font-weight-bold
          "
          @click="dialog = false"
        >
          戻る
        </v-btn>
      </v-card>
    </v-dialog>

    <v-overlay
      :value="loading"
    >
      <v-progress-circular
        indeterminate
        :size="80"
        :width="10"
      />
    </v-overlay>

    <v-snackbar
      v-model="snackbar"
      color="blue-grey"
      top
    >
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          class="
            secondary
            font-weight-bold
          "
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'

@Component({
  components: {
    PrivacyPolicy: () => import('~/components/PrivacyPolicy.vue')
  },
  head () {
    return {
      title: 'お問い合わせ',
      meta: [
        {
          hid: 'description',
          property: 'description',
          content: 'お問い合わせはこちらからお願い致します。'
        }
      ]
    }
  },
  data () {
    return {
      title: {
        value: null,
        rules: [v => !!v || '必ず入力してください'],
        label: '件名'
      },
      contact: {
        value: null,
        rules: [
          v => !!v || '必ず入力してください',
          v => /.+@.+/.test(v) || 'メールアドレスの形式が正しくありません'
        ],
        label: 'メールアドレス'
      },
      content: {
        value: null,
        rules: [v => !!v || '必ず入力してください'],
        label: '内容'
      },
      valid: false,
      dialog: false,
      snackbar: false,
      loading: false,
      message: null
    }
  },
  methods: {
    post () {
      this.loading = true
      if (!this.valid) { return }
      const instance = axios.create({
        baseURL: 'https://mcpnsdys00.execute-api.ap-northeast-1.amazonaws.com'
      })
      instance.post('/default/contactFunction', {
        title: this.title.value,
        contact: this.contact.value,
        content: this.content.value
      }).then((response) => {
        this.result = response.data.body
        this.message = '送信が完了しました。'
      }).catch((error) => {
        this.result = error
        this.message = '送信が失敗しました。もう一度お試しください。'
      }).finally(() => {
        this.loading = false
        this.snackbar = true
      })
    }
  }
})

export default class Index extends Vue { }
</script>
<style scoped>
.breakLine {
  white-space: pre-line;
}
.contentPreview {
  max-height: 200px;
  overflow: scroll;
}
</style>
