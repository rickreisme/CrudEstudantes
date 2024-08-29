<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3>Adicionar Estudante</h3>
      </div>

      <form class="card-body container mt-3">
        <div class="mb-3">
          <label for="nome">Nome</label>
          <input
            type="text"
            v-model="model.estudante.nome"
            id="nome"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="curso">Curso</label>
          <input
            type="text"
            v-model="model.estudante.curso"
            id="curso"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="email">E-mail</label>
          <input
            type="text"
            v-model="model.estudante.email"
            id="email"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="telefone">Celular</label>
          <input
            type="text"
            v-model="model.estudante.telefone"
            id="telefone"
            class="form-control"
            @input="formatNumber"
          />
        </div>

        <div class="d-flex justify-content-between mb-3">
          <button type="button" @click="saveEstudante" class="btn btn-primary">
            Enviar
          </button>

          <RouterLink to="/estudantes" class="btn btn-info">
            Voltar
          </RouterLink>
        </div>
      </form>

      <div
        v-if="successMessage"
        class="toast-container position-fixed top-0 end-0 text-center"
      >
        <div
          id="successToast"
          class="toast bg-success text-white fs-6 me-3 mt-3 custom-toast"
          role="alert"
        >
          {{ successMessage }}
        </div>
      </div>

      <div
        v-if="errorMessage"
        class="toast-container position-fixed top-0 end-0 text-center"
      >
        <div
          id="errorToast"
          class="toast bg-danger text-white fs-6 me-3 mt-3 custom-toast"
          role="alert"
        >
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { formatPhoneNumber } from '../../utils/formatPhoneNumber'

export default {
  name: 'estudanteCriar',
  setup() {
    const router = useRouter()
    const model = ref({
      estudante: {
        nome: '',
        curso: '',
        email: '',
        telefone: ''
      }
    })
    const successMessage = ref('')
    const errorMessage = ref('')

    function showToast(id, message) {
      nextTick(() => {
        const toastElement = document.getElementById(id)
        if (toastElement) {
          const toastBody = toastElement.querySelector('.toast-body')
          if (toastBody) {
            toastBody.textContent = message
            const toast = new bootstrap.Toast(toastElement, {
              autohide: true,
              delay: 3000
            })
            toast.show()
          }
        }
      })
    }

    function formatNumber() {
      model.value.estudante.telefone = formatPhoneNumber(
        model.value.estudante.telefone
      )
    }

    function isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailPattern.test(email)
    }

    async function saveEstudante() {
      console.log('Dados:', model.value.estudante)

      if (
        !model.value.estudante.nome ||
        !model.value.estudante.curso ||
        !model.value.estudante.email ||
        !model.value.estudante.telefone
      ) {
        errorMessage.value = 'Por favor, preencha todos os campos!'
        showToast('errorToast', errorMessage.value)
        return
      }

      if (!isValidEmail(model.value.estudante.email)) {
        errorMessage.value = 'Digite um email válido!'
        model.value.estudante.email = ''
        showToast('errorToast', errorMessage.value)
        return
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/estudantes`,
          model.value.estudante
        )
        successMessage.value = response.data.message
        model.value.estudante = { nome: '', curso: '', email: '', telefone: '' }
        showToast('successToast', successMessage.value)
        setTimeout(() => {
          router.push('/estudantes')
        }, 2500)
      } catch (error) {
        console.error('Erro ao adicionar estudante', error)
        successMessage.value = ''
        errorMessage.value = 'Erro ao adicionar estudante!'
        showToast('errorToast', errorMessage.value)
      }
    }

    return {
      model,
      successMessage,
      errorMessage,
      showToast,
      formatNumber,
      saveEstudante
    }
  }
}
</script>
