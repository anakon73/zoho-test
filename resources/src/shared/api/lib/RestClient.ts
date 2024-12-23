import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'

import type { AnyObject } from '@/shared/lib/utils'
import { FetchError, UnauthorizedError } from './errors'

export class RestClient {
  async get<T>(
    url: string,
    schema?: z.ZodType<T>,
    params?: Record<string, string>,
  ): Promise<T> {
    return this.#request(url, schema, {
      method: 'GET',
      ...params,
    })
  }

  async post<T>(
    url: string,
    payload?: AnyObject,
    schema?: z.ZodType<T>,
    params?: Record<string, string>,
  ): Promise<T> {
    return this.#request(url, schema, {
      method: 'POST',
      body: JSON.stringify(payload),
      ...params,
    })
  }

  async put<T>(
    url: string,
    payload?: AnyObject,
    schema?: z.ZodType<T>,
    params?: Record<string, string>,
  ): Promise<T> {
    return this.post(url, payload, schema, {
      method: 'PUT',
      ...params,
    })
  }

  async patch<T>(
    url: string,
    payload?: AnyObject,
    schema?: z.ZodType<T>,
    params?: Record<string, string>,
  ): Promise<T> {
    return this.post(url, payload, schema, {
      method: 'PATCH',
      ...params,
    })
  }

  async delete<T>(
    url: string,
    payload?: AnyObject,
    schema?: z.ZodType<T>,
    params?: Record<string, string>,
  ): Promise<T> {
    return this.post(url, payload, schema, {
      method: 'DELETE',
      ...params,
    })
  }

  async #request<T>(
    url: string,
    schema?: z.ZodType<T>,
    params?: RequestInit,
  ): Promise<T> {
    const endpoint = this.#formatEndpoint(url)

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    const response = await fetch(endpoint, {
      ...params,
      headers: {
        ...headers,
        ...params?.headers,
      },
    })

    if (response.status === StatusCodes.UNAUTHORIZED) {
      throw new UnauthorizedError()
    }

    if (response.status === StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE) {
      return this.#request(url, schema, params)
    }

    return this.#handleResponse(response, schema)
  }

  #formatEndpoint(url: string) {
    if (!url.startsWith('http')) {
      return url
    }

    return url
  }

  async #handleResponse<T>(response: Response, schema?: z.ZodType<T>) {
    if (response.ok) {
      if (response.status === StatusCodes.NO_CONTENT) {
        return null
      }

      const data = await response.json()

      if (schema) {
        try {
          return schema.parse(data)
        }
        catch (error) {
          if (error instanceof z.ZodError) {
            console.error('Validation error:', error)
            throw new Error('Response validation failed')
          }
          throw error
        }
      }

      return data
    }

    const responseData = await response.json()
    throw new FetchError(response, responseData)
  }
}
