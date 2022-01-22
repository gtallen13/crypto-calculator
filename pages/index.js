import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin,faEthereum,faMonero } from '@fortawesome/free-brands-svg-icons'
import Select from 'react-select'
import { useEffect, useState } from 'react'
export default function Home({coins}) {
  const [currentCoin,setCurrentCoin] = useState('');
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [investment, setInvestment] = useState(500);
  const options = []
  coins.map((coin)=>{
    options.push({
      value:coin.current_price,
      label:coin.name.toString(), 
      symbol:coin.symbol.toUpperCase()
    })
  })  

  useEffect(()=>{
    setBuyPrice(currentCoin.value)
    setSellPrice(currentCoin.value+(currentCoin.value*0.50))
  },[currentCoin.value])

  const calculateTotal = ()=>{
    const purchasedStock = investment/buyPrice;
    const soldStock = purchasedStock*sellPrice;
    setNetTotal(soldStock - investment);
  }
  return (
    <div className='container center'>
      <div className='title'>
        <div className='title-icons center'>
          <FontAwesomeIcon icon={faBitcoin}/>
          <FontAwesomeIcon icon={faEthereum}/>
          <FontAwesomeIcon icon={faMonero}/>
        </div>
        <h1>Crypto Profit Calculator</h1>
      </div>
      <form className={styles.frmCrypto}>
        <div className={styles.frmRow}>
          <label className={styles.frmLabel}>Investment Amount</label>
          <input type={"number"} id='txtInvestment' name='txtInvestment' className={styles.frmInput} value={investment} onChange={e => setInvestment(e.target.value)}/>
        </div>
        <div className={styles.frmRow}>
          <label className={styles.frmLabel}>Buy Price</label>
          <input className={styles.frmInput} type={"number"} id='txtBuy' name='txtBuy' value={buyPrice} onChange={ e => setBuyPrice(e.target.value)}/>
        </div>
        <div className={styles.frmRow}>
          <label className={styles.frmLabel}>Sell Price</label>
          <input className={styles.frmInput} type={"number"} id='txtSell' name='txtSell' value={sellPrice} onChange={ e => setSellPrice(e.target.value)}/>
        </div>
        <div className={styles.frmRow}>
          <label className={styles.frmLabel}>Coin</label>
          <Select
          options={options}
          className={styles.frmInput}
          defaultValue={currentCoin}
          onChange={setCurrentCoin}
          />
        </div>
        {currentCoin ?(<span>{currentCoin.symbol} {`$${currentCoin.value}`}</span>):null}
        {netTotal ? (<span>Total: {netTotal}</span>):null}
        <button type='button' onClick={()=>calculateTotal()}>Calculate</button>
      </form>
    </div>
  )
}

export async function getServerSideProps(context){
  const endpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
  const data = await fetch(endpoint)
  const coins = await data.json()

  return{
    props:{coins}
  }
}
