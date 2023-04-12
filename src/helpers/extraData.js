import VER from "../assets/images/VER.avif";
import PER from "../assets/images/PER.avif";
import ALO from "../assets/images/ALO.avif";
import HAM from "../assets/images/HAM.avif";
import SAI from "../assets/images/SAI.avif";
import STR from "../assets/images/STR.avif";
import RUS from "../assets/images/RUS.avif";
import NOR from "../assets/images/NOR.avif";
import HUL from "../assets/images/HUL.avif";
import LEC from "../assets/images/LEC.avif";
import BOT from "../assets/images/BOT.avif";
import OCO from "../assets/images/OCO.avif";
import PIA from "../assets/images/PIA.avif";
import GAS from "../assets/images/GAS.avif";
import ZHO from "../assets/images/ZHO.avif";
import TSU from "../assets/images/TSU.avif";
import MAG from "../assets/images/MAG.avif";
import ALB from "../assets/images/ALB.avif";
import SAR from "../assets/images/SAR.avif";
import DEV from "../assets/images/DEV.avif";

import alfaImg from "../assets/images/alfa.avif";
import alphatauriImg from "../assets/images/alphatauri.avif";
import alpineImg from "../assets/images/alpine.avif";
import aston_martinImg from "../assets/images/aston_martin.avif";
import ferrariImg from "../assets/images/ferrari.avif";
import haasImg from "../assets/images/haas.avif";
import mclarenImg from "../assets/images/mclaren.avif";
import mercedesImg from "../assets/images/mercedes.avif";
import red_bullImg from "../assets/images/red_bull.avif";
import williamsImg from "../assets/images/williams.avif";

import williamsCar from "../assets/images/williamsCar.avif";
import alfaCar from "../assets/images/alfaCar.avif";
import alphatauriCar from "../assets/images/alphatauriCar.avif";
import alpineCar from "../assets/images/alpineCar.avif";
import aston_martinCar from "../assets/images/aston_martinCar.avif";
import ferrariCar from "../assets/images/ferrariCar.avif";
import haasCar from "../assets/images/haasCar.avif";
import mclarenCar from "../assets/images/mclarenCar.avif";
import mercedesCar from "../assets/images/mercedesCar.avif";
import red_bullCar from "../assets/images/red_bullCar.avif";

export const driversExtra = {
  VER: {
    image: VER,
    number: 1,
  },
  PER: {
    image: PER,
  },
  ALO: {
    image: ALO,
  },
  HAM: {
    image: HAM,
  },
  SAI: {
    image: SAI,
  },
  STR: {
    image: STR,
  },
  RUS: {
    image: RUS,
  },
  NOR: {
    image: NOR,
  },
  HUL: {
    image: HUL,
  },
  LEC: {
    image: LEC,
  },
  BOT: {
    image: BOT,
  },
  OCO: {
    image: OCO,
  },
  PIA: {
    image: PIA,
  },
  GAS: {
    image: GAS,
  },
  ZHO: {
    image: ZHO,
  },
  TSU: {
    image: TSU,
  },
  MAG: {
    image: MAG,
  },
  ALB: {
    image: ALB,
  },
  SAR: {
    image: SAR,
  },
  DEV: {
    image: DEV,
  },
};

export const constructorsExtra = {
  alfa: {
    logo: alfaImg,
    drivers: [
      { name: "Valtteri Bottas", image: BOT },
      { name: "Zhou Guanyu", image: ZHO },
    ],
    car: alfaCar,
  },
  alphatauri: {
    logo: alphatauriImg,
    drivers: [
      { name: "Nyck De Varies", image: DEV },
      { name: "Yuki Tsunoda", image: TSU },
    ],
    car: alphatauriCar,
  },
  alpine: {
    logo: alpineImg,
    drivers: [
      { name: "Esteban Ocon", image: OCO },
      { name: "Pierre Gasly", image: GAS },
    ],
    car: alpineCar,
  },
  aston_martin: {
    logo: aston_martinImg,
    drivers: [
      { name: "Fernando Alonso", image: ALO },
      { name: "Lance Stroll", image: STR },
    ],
    car: aston_martinCar,
  },
  ferrari: {
    logo: ferrariImg,
    drivers: [
      { name: "Charles Leclerc", image: LEC },
      { name: "Carlos Sainz", image: SAI },
    ],
    car: ferrariCar,
  },
  haas: {
    logo: haasImg,
    drivers: [
      { name: "Nico Hulkenberg", image: HUL },
      { name: "Kevin Magnussen", image: MAG },
    ],
    car: haasCar,
  },
  mclaren: {
    logo: mclarenImg,
    drivers: [
      { name: "Oscar Piastri", image: PIA },
      { name: "Lando Norris", image: NOR },
    ],
    car: mclarenCar,
  },
  mercedes: {
    logo: mercedesImg,
    drivers: [
      { name: "George Russell", image: RUS },
      { name: "Lewis Hamilton", image: HAM },
    ],
    car: mercedesCar,
  },
  red_bull: {
    logo: red_bullImg,
    drivers: [
      { name: "Max Verstappen", image: VER },
      { name: "Sergio Perez", image: PER },
    ],
    car: red_bullCar,
  },
  williams: {
    logo: williamsImg,
    drivers: [
      { name: "Logan Sargeant", image: SAR },
      { name: "Alexander Albon", image: ALB },
    ],
    car: williamsCar,
  },
};
