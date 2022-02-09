import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin,faEthereum,faMonero } from '@fortawesome/free-brands-svg-icons'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import  {toast,ToastContainer} from 'react-nextjs-toast'
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
    if (currentCoin.value)
    {
      const newBuyPrice = currentCoin.value.toFixed(6)
      const newSellPrice = currentCoin.value + currentCoin.value*0.50
      setBuyPrice(newBuyPrice)
      setSellPrice(newSellPrice)  
    }
  },[currentCoin.value])
  useEffect(()=>{
    if(currentCoin){
      calculateTotal()
    }
  })
  const calculateTotal = ()=>{
    if (currentCoin.value){
      const purchasedStock = investment/buyPrice;
      const soldStock = purchasedStock*sellPrice;
      const newNetTotal = soldStock - investment 
      setNetTotal(newNetTotal.toFixed(6));
    }
    else{
      toast.notify("Please select a coin",{
        title:"Something's missing..."      
      })
    }
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
        <ToastContainer align={"right"} />
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
          className={`${styles.frmInput} ${styles.selectInput}`}
          defaultValue={currentCoin}
          onChange={setCurrentCoin}
          />
        </div>
        {currentCoin ?(<span>{currentCoin.symbol} price: {`$${currentCoin.value}`}</span>):null}
        {netTotal ? (
        <span className={netTotal > 0 ? 'positive':'negative'}>Net Total: {netTotal}</span>
        ):null}
      </form>
    </div>
  ) 
}

export async function getServerSideProps(context){
  const endpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_p age=50&page=1&sparkline=false'
  const data = await fetch(endpoint)
  const coins = await data.json()

  return{
    props:{coins}
  }
}
