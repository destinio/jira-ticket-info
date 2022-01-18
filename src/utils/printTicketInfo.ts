import chalk from 'chalk'

function printTicketInfo(ticketInfo) {
  console.log(`
  
    ${chalk.greenBright('Ticket:')} ${chalk.cyanBright(ticketInfo.ticket)}
    ${chalk.greenBright('Summary:')} ${chalk.cyanBright(ticketInfo.summary)}
  
    ${chalk.greenBright('Status:')} ${chalk.cyanBright(ticketInfo.status.state)}
    ${chalk.greenBright('Priority:')} ${chalk.cyanBright(ticketInfo.priority)}
    
    ${chalk.greenBright('Parent:')} ${chalk.cyanBright(ticketInfo.parent.ticket)}
    ${chalk.greenBright('Parent Summary:')} ${chalk.cyanBright(ticketInfo.parent.summary)}
    
    ${chalk.greenBright('Git Branch:')} ${chalk.cyanBright(ticketInfo.gitBranch)}
  
  
    `)
}

export { printTicketInfo }
