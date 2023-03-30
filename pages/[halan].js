/* eslint-disable react-hooks/rules-of-hooks */
import szotar from './api/szotar.js';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export async function getStaticPaths({}) {
    const paths = szotar.map((entry) => ({
        params: { halan: entry.halan}
    }));
    return { paths, fallback: false};
}

export async function getStaticProps({params}) {
    const wordData = szotar.find((entry) => entry.halan === params.halan);
    return { props: { wordData }};
}

export default function Word({wordData}) {
    
    const {halan, bekuldo2, magyarazo2, magy, datum2} = wordData;

    const [currentIndex, setCurrentIndex] = useState(0);

    const currentEntry = szotar?.[currentIndex];

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % szotar.length);
        
    };
    
    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + szotar.length) % szotar.length);
    };

    useEffect(() => {
        if (szotar.length > 0) {
        Router.push(`/${currentEntry.halan}`);
    }}, [currentEntry]);

    return (
    <>
    <div className={styles.wrapper}>
    <h1 className={styles.title}>Értelmetlenező Szótár Prodzsekt</h1>
    <div className={styles.entryNavBtn}>
    <div className={styles.entryContainerNavBtnLeft} onClick={handlePrev}>
    </div>
    <div className={styles.entryMain}>
        <div className={styles.entryContainer}>
            <div className={styles.entryContainerH1}>
                <h1>{currentEntry.halan}</h1>
            </div>
            <div className={styles.entryContainerNevek}>
                <div className={styles.entryContainerBekuldo2}><div>Beküldő:</div><div>{currentEntry.bekuldo2}</div></div>
                <div className={styles.entryContainerMagyarazo2}><div>Magyarázó:</div><div>{currentEntry.magyarazo2}</div></div>
                <div className={styles.entryContainerDatum2}><div>Dátum:</div><div>{currentEntry.datum2.slice(0,10)}</div></div>
            </div>
            <div className={styles.entryContainerMagy}>
                {currentEntry.magy}
            </div>
        </div>
        
    </div>
    <div className={styles.entryContainerNavBtnRight} onClick={handleNext}>
    </div>
    </div>
    </div>
    </>
    )
}