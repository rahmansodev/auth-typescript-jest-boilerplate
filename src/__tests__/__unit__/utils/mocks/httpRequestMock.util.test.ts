import { generateHttpRequestMock } from '@utils/mocks/httpRequestMock.util'

describe('generateHttpRequestMock', () => {
  it('should generate an HTTP request mock with default values', () => {
    const httpRequestMock = generateHttpRequestMock()

    // Add your assertions here based on the default values.
    expect(httpRequestMock.query).toEqual({})
    expect(httpRequestMock.params).toEqual({})
    expect(httpRequestMock.ip).toBeUndefined()
    expect(httpRequestMock.method).toEqual('')
    expect(httpRequestMock.path).toEqual('')
    expect(httpRequestMock.headers).toEqual({
      'Content-Type': undefined,
      Referer: undefined,
      'User-Agent': undefined
    })
    expect(httpRequestMock.user).toBeUndefined()
    expect(httpRequestMock.timestamp).toBeInstanceOf(Date)
    expect(httpRequestMock.body).toEqual({})
  })

  it('should generate an HTTP request mock with custom values', () => {
    const customValues = {
      query: { companyId: '6218c8118f507cc3f8ef1d64' },
      params: { param1: 'value1', param2: 'value2' },
      user: { _id: 'userId', username: 'customUser' },
      body: { key: 'value' }
    }

    const httpRequestMock = generateHttpRequestMock(customValues)

    // Add your assertions here based on the custom values.
    expect(httpRequestMock.query).toEqual({ companyId: customValues.query.companyId })
    expect(httpRequestMock.params).toEqual(customValues.params)
    expect(httpRequestMock.ip).toBeUndefined() // Add custom IP if needed
    expect(httpRequestMock.method).toEqual('')
    expect(httpRequestMock.path).toEqual('')
    expect(httpRequestMock.headers).toEqual({
      'Content-Type': undefined,
      Referer: undefined,
      'User-Agent': undefined
    })
    expect(httpRequestMock.user).toEqual(customValues.user)
    expect(httpRequestMock.timestamp).toBeInstanceOf(Date)
    expect(httpRequestMock.body).toEqual(customValues.body)
  })
})
