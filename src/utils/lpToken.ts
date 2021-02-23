import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { honeyswapClient } from '../apollo/clients'
import { GET_LIQUIDITY } from '../apollo/queries'
import { INTEGERS } from '../sushi/lib/constants'

export async function lpTokenValue(lpContract: Contract): Promise<BigNumber> {
  // Get the total amount of LP tokens for this pair
  const lpTotalSupply = new BigNumber(
    await lpContract.methods.totalSupply().call(),
  ).div(INTEGERS.INTEREST_RATE_BASE)

  console.log(
    'lpContract.options.address',
    lpContract.options.address.toLowerCase(),
  )

  // Get the total liquidity for this pair (in USD)
  const { data: liquidityData } = await honeyswapClient.query({
    query: GET_LIQUIDITY,
    variables: { pair: lpContract.options.address.toLowerCase() },
  })
  console.log('liquidityData', liquidityData)
  const pairLiquidityValue = new BigNumber(liquidityData.pair.reserveETH)

  // Calculate the USD value of each LP token
  return pairLiquidityValue.div(lpTotalSupply)
}
