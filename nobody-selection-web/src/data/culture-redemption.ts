/** 文化沉浸兑换名额（localStorage Demo） */

import { CULTURE_EVENTS } from '@/data/culture-program'

const CREDITS_KEY = 'culture_redemption_credits'
const SIGNUPS_KEY = 'culture_event_signups'

export function getRedemptionCredits(): number {
  return Number(localStorage.getItem(CREDITS_KEY) || '1')
}

export function setRedemptionCredits(n: number) {
  localStorage.setItem(CREDITS_KEY, String(Math.max(0, n)))
}

export function loadEventSignups(): Record<number, number> {
  try {
    return JSON.parse(localStorage.getItem(SIGNUPS_KEY) || '{}')
  } catch {
    return {}
  }
}

export function getEventRemainingSlots(eventId: number): number {
  const ev = CULTURE_EVENTS.find((e) => e.id === eventId)
  if (!ev) return 0
  const used = loadEventSignups()[eventId] || 0
  return Math.max(0, ev.slots - used)
}

export function signupCultureEvent(eventId: number): { ok: boolean; message: string } {
  const credits = getRedemptionCredits()
  if (credits < 1) return { ok: false, message: '暂无可用兑换名额，请先完成 10 节正式课' }
  const remaining = getEventRemainingSlots(eventId)
  if (remaining < 1) return { ok: false, message: '该场次名额已满，请选择其他场次或加入候补' }
  const signups = loadEventSignups()
  signups[eventId] = (signups[eventId] || 0) + 1
  localStorage.setItem(SIGNUPS_KEY, JSON.stringify(signups))
  setRedemptionCredits(credits - 1)
  return { ok: true, message: '报名成功，已消耗 1 次兑换名额' }
}
