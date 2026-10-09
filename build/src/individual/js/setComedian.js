const setComedian = async () => {
  if (Var.login.profiles.includes('comedian')) {
    Fn.setToggleBtnRoll('comedian', 'on')

    const response = await fetch(`${Var.api_base_url}/comedian?service=standup`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    const data = await response.json()

    if (!data.success) {
      console.log(data.error)
      return
    }

    Var.comedian_profile = data.comedian
  }
}