import { EthereumChainId } from '@injectivelabs/ts-types'
import { ethers } from 'ethers'

export default class BaseContract<T> {
  public readonly abi: any

  public readonly address: string

  protected readonly contract: T

  protected readonly ethersInterface: any

  constructor({
    abi,
    address,
    provider
  }: {
    abi: any
    provider: any
    address: string
    ethereumChainId?: EthereumChainId
  }) {
    this.abi = abi
    this.address = address
    this.contract = new ethers.Contract(address, abi, provider) as unknown as T
    this.ethersInterface = new ethers.Interface(abi) as any
  }
}
