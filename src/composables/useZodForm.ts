import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'
import type { z } from 'zod'

export function useZodForm<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  type SchemaType = z.infer<typeof schema>

  const formData = ref<SchemaType>({} as SchemaType)
  const errors = ref<Partial<Record<keyof SchemaType, string>>>({})

  function validateField(fieldName: keyof SchemaType) {
    const fieldSchema = schema.shape[fieldName]
    const value = formData.value[fieldName];

    const result = fieldSchema.safeParse(value)

    if (result.success) {
      errors.value[fieldName] = ''
    } else {
      errors.value[fieldName] = result.error.issues[0]?.message || 'Invalid'
    }
  }

  function validateForm(): boolean {
    const result = schema.safeParse(formData.value)

    if (result.success) {
      resetErrors()
      return true
    } else {
      result.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof SchemaType
        errors.value[field] = issue.message
      })
      return false
    }
  }

  function resetErrors() {
    errors.value = {}
  }

  function handleChange(e: Event, fieldName: keyof SchemaType) {
    validateField(fieldName)
  }

  const debouncedHandleChange = useDebounceFn(handleChange, 500)


  return {
    formData,
    errors,
    validateField,
    validateForm,
    resetErrors,
    debouncedHandleChange,
  }
}
