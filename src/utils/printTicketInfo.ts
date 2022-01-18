import chalk from 'chalk'

const gB = chalk.greenBright
const cB = chalk.cyanBright
interface TicketInfo {
  ticket: string
  summary: string
  status: {
    state: string
    color: string
  }
  priority: string
  parent: {
    ticket: string
    summary: string
  }
  gitBranch: string
}

function printTicketInfo(ticketInfo: TicketInfo) {
  console.log(`
  
    ${gB('Ticket:')} ${cB(ticketInfo.ticket)}
    ${gB('Summary:')} ${cB(ticketInfo.summary)}
  
    ${gB('Status:')} ${cB(ticketInfo.status.state)}
    ${gB('Priority:')} ${cB(ticketInfo.priority)}
    
    ${gB('Parent:')} ${cB(ticketInfo.parent.ticket)}
    ${gB('Parent Summary:')} ${cB(ticketInfo.parent.summary)}
    
    ${gB('Git Branch:')} ${cB(ticketInfo.gitBranch)}
  
  
    `)
}

export { printTicketInfo }
