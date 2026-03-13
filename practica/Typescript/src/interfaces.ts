import e from "express"

export interface RootApi {
  count: number
  results: ResultApi[]
}

export interface ResultApi {
  index: string
  name: string
  url: string
}

export interface RootMonsters {
  index: string
  name: string
  size: string
  type: string
  alignment: string
  armor_class: ArmorClass[]
  hit_points: number
  hit_dice: string
  hit_points_roll: string
  speed: Speed
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
  proficiencies: Proficiency[]
  damage_vulnerabilities: any[]
  damage_resistances: any[]
  damage_immunities: any[]
  condition_immunities: any[]
  senses: Senses
  languages: string
  challenge_rating: number
  proficiency_bonus: number
  xp: number
  special_abilities: SpecialAbility[]
  actions: Action[]
  legendary_actions: LegendaryAction[]
  image: string
  url: string
  updated_at: string
  forms: any[]
  reactions: any[]
}

export interface ArmorClass {
  type: string
  value: number
}

export interface Speed {
  walk: string
  swim: string
}

export interface Proficiency {
  value: number
  proficiency: Proficiency2
}

export interface Proficiency2 {
  index: string
  name: string
  url: string
}

export interface Senses {
  darkvision: string
  passive_perception: number
}

export interface SpecialAbility {
  name: string
  desc: string
  damage: any[]
  dc?: Dc
}

export interface Dc {
  dc_type: DcType
  dc_value: number
  success_type: string
}

export interface DcType {
  index: string
  name: string
  url: string
}

export interface Action {
  damage: Damage[]
  name: string
  multiattack_type?: string
  desc: string
  actions: Action2[]
  attack_bonus?: number
  dc?: Dc2
  usage?: Usage
}

export interface Damage {
  damage_type: DamageType
  damage_dice: string
}

export interface DamageType {
  index: string
  name: string
  url: string
}

export interface Action2 {
  action_name: string
  count: string
  type: string
}

export interface Dc2 {
  dc_type: DcType2
  dc_value: number
  success_type: string
}

export interface DcType2 {
  index: string
  name: string
  url: string
}

export interface Usage {
  type: string
  times: number
}

export interface LegendaryAction {
  name: string
  desc: string
  damage: Damage2[]
}

export interface Damage2 {
  damage_type: DamageType2
  damage_dice: string
}

export interface DamageType2 {
  index: string
  name: string
  url: string
}

/*

{ index: "adult-black-dragon", 
name: "Adult Black Dragon", 
size: "Huge", 
type: "dragon", 
alignment: "chaotic evil", 
cr: 14, 
ac: 19, 
hp: 195, 
speed: 80, 
stats: { str: 23, dex: 14, con: 21, int: 14, wis: 13, cha: 17 }, 
immuneCount: 1, 
resistCount: 0, 
vulnCount: 0, 
hasL} */

export interface MonsterNorm{
index: string, 
name: string, 
size: string, 
type: string, 
alignment: string, 
cr: number, 
ac: number, 
hp: number, 
speed: number, 
stats: statsNorm, 
immuneCount: number, 
resistCount: number, 
vulnCount: number, 
hasLegendary: boolean
}

export interface statsNorm{ str: number, dex: number, con: number, int: number, wis: number, cha: number }