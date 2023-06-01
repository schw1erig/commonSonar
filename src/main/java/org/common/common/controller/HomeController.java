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

    @RequestMapping(value="/", method= RequestMethod.GET)
    public String home() {
        return "homepage";
    }

    @RequestMapping(value="/homepage", method= RequestMethod.GET)
    public String index() {
        return "homepage";
    }


    @RequestMapping(value="/register", method= RequestMethod.GET)
    public String register() {
        return "register";
    }


    @RequestMapping(value="/chooseTopic", method= RequestMethod.GET)
    public String choose(Model model) {
        model.addAttribute("topic", new String());
        return "TopicPage";
    }
    @RequestMapping(value="/chatPortal", method= RequestMethod.GET)
    public String chat(@ModelAttribute("user") ApplicationUser user,  Model model) {
        return "chat";
    }

    @RequestMapping(value="/chatPortal/matchmaking", method=RequestMethod.POST)
    public String matchmaking(@ModelAttribute String topic, Model model){
        model.addAttribute("topic", topic);
        return "redirect:/chatPortal";
    }


}
