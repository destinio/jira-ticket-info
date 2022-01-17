import 'dotenv/config'
import axios from 'axios'
import chalk from 'chalk'

async function getTicketInfo(issueCode: string) {
  const theString = `${process.env.JIRA_EMAIL}:${process.env.JIRA_TOKEN}`
  const base64 = Buffer.from(theString).toString('base64')

  const res = await axios.get(
    `https://${process.env.JIRA_DOMAIN}.atlassian.net/rest/api/3/issue/${issueCode}`,
    {
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const {
    key,
    fields: {
      summary,
      parent,
      status: {
        statusCategory: { key: statusKey, colorName: color },
      },
      priority: { name: priority },
    },
  } = await res.data

  const lowerCaseKey = key.toLowerCase()
  const lowerCaseSummary = summary.toLowerCase().replace(/\s/g, '-')

  const parentKey = parent ? parent.key : ''
  const parentSummary = parent ? parent.fields.summary : ''

  const ticketInfo = {
    ticket: key,
    summary,
    status: {
      state: statusKey,
      color,
    },
    priority,
    parent: {
      ticket: parentKey,
      summary: parentSummary,
    },
    gitBranch: `${lowerCaseKey}-${lowerCaseSummary}`,
  }

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

;(async () => {
  const ticket = process.argv[2]

  if (!ticket) {
    console.log('Please include a ticket code')
    return
  }

  await getTicketInfo(ticket)
})()

// Example: ./index TICKET-123
