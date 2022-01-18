import chalk from 'chalk'
import 'dotenv/config'

import { getTicketInfo } from './utils/getTicketInfo.js'
import { printTicketInfo } from './utils/printTicketInfo.js'
;(async () => {
  const ticket = process.argv[2]
  const flag = process.argv[3]

  if (!ticket) {
    console.log('Please include a ticket code')
    return
  }

  const ticketInfo = await getTicketInfo(ticket)

  if (flag === '-b' || flag === '--branch') {
    console.log(ticketInfo.gitBranch)

    return
  }

  printTicketInfo(ticketInfo)
})()

// Example: ./index TICKET-123
