import 'dotenv/config'
import clipboard from 'clipboardy'

import { getTicketInfo } from './utils/getTicketInfo.js'
import { printTicketInfo } from './utils/printTicketInfo.js'
;(async () => {
  const ticket = process.argv[2]
  const flag = process.argv[3]
  const flag2 = process.argv[4]

  if (!ticket) {
    console.log('Please include a ticket code')
    return
  }

  const ticketInfo = await getTicketInfo(ticket)

  if (flag === '-b' || flag === '--branch') {
    console.log(ticketInfo.gitBranch)

    if (flag2 === '-c' || flag2 === '--copy') {
      console.log('Copying to clipboard')
      clipboard.writeSync(ticketInfo.gitBranch)
    }

    return
  }

  printTicketInfo(ticketInfo)
})()

// Example: ./index TICKET-123
