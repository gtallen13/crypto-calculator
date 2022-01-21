import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin,faEthereum,faMonero } from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  //amount invested
  //buy price
  //sell price
  //coin
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
          <input type={"number"} id='txtInvestment' name='txtInvestment' className={styles.frmInput}/>
        </div>
        <div className={styles.frmRow}>
          <label className={styles.frmLabel}>Buy Price</label>
          <input className={styles.frmInput} type={"number"} id='txtBuy' name='txtBuy'/>
        </div>
        <div className={styles.frmRow}>
          <label className={styles.frmLabel}>Sell Price</label>
          <input className={styles.frmInput} type={"number"} id='txtSell' name='txtSell'/>
        </div>
        <div className={styles.frmRow}>
          <label className={styles.frmLabel}>Coin</label>
          <select className={styles.frmInput} name='cbCoin' id='cbCoin'>
            <option className={styles.frmInput} value="">Select a coin</option>
          </select>
        </div>
        <button>Calculate</button>
      </form>
    </div>
  )
}
