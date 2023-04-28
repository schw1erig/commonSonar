package org.common.common.controller;

import org.common.common.model.ApplicationUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController
{
    @RequestMapping(value="/homepage", method= RequestMethod.GET)
    public String index() {
        return "homepage";
    }

    @RequestMapping(value="/chatPortal", method= RequestMethod.GET)
    public String chat(@ModelAttribute("user") ApplicationUser user, Model model) {
        return "chat";
    }

    @RequestMapping(value="/register", method= RequestMethod.GET)
    public String register() {
        return "register";
    }
}
