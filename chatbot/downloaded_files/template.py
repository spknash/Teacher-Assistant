

# WELCOME TO BLACKJACK GAME CODE, IF YOU HAVE NO IDEA WHAT IS A BLACKJACK GAME, PLEASE CHECK IT OUT IN GOOGLE


# let's import Random library
import random


# Let's give the info of the card's suits, ranks and values

suits = ('Hearts', 'Diamonds', 'Spades', 'Clubs')
ranks = ('Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace')
values = {'Two':2, 'Three':3, 'Four':4, 'Five':5, 'Six':6, 'Seven':7, 'Eight':8, 'Nine':9, 'Ten':10, 'Jack':10,
          'Queen':10, 'King':10, 'Ace':11}


playing = True

# Following below is the Card Class which will initiate a card with the given suit and rank

class Card:

    def __init__(self,suit,rank):
        # TODO Initialize suit and rank of the card
        
        

    def __str__(self):
        return self.rank + ' of ' + self.suit


# Following below is the Deck Class which will create a deck from the given cards

class Deck:

    def __init__(self):
        self.deck = []  # start with an empty list

        # TODO Create a deck of cards 


    def __str__(self):
        deck_comp = ''  # start with an empty string
        for card in self.deck:
            deck_comp += '\n '+card.__str__() # add each Card object's print string
        return 'The deck has:' + deck_comp

    def shuffle(self):          # shuffle function will shuffle the whole deck
        random.shuffle(self.deck)

    def deal(self):             # deal function will take one card from the deck
        # TODO implement the deal function
        


# Following is the Hand Class which will add the cards from deck class to the player's hand

class Hand:
    def __init__(self):
        # TODO Innitialize the hand class by creating an empty list and value attribute
        

# add_card function will add a card to the player's hand

    def add_card(self,card):
        # TODO Create a function to add a card to the hand
       

# since ace can have two values as 1 or 11, adjust_for_ace will adjust the value of ace


    def adjust_for_ace(self):
        while self.value > 21 and self.aces:
            self.value -= 10
            self.aces -= 1

'''     In addition to decks of cards and hands, we need to keep track of a Player's starting chips, bets, and ongoing winnings. 
This could be done using global variables, but in the spirit of object oriented programming, let's make a Chips class instead!       '''

class Chips:

    def __init__(self):
        # TODO Innitialize the chips class by creating an empty list and value attribute
        

    def win_bet(self):
        self.total += self.bet

    def lose_bet(self):
        self.total -= self.bet


# FUNCTIONS HERE:


# FUNCTION FOR TAKING BETS
def take_bet(chips):

    # TODO Implement a function for taking bets
    

# function for taking hits

def hit(deck,hand):

    # TODO Implement the hit() function that will add card to the player's hand and adjust for ace
    



# function prompting the Player to Hit or Stand

def hit_or_stand(deck,hand):
    global playing  # to control an upcoming while loop

    while True:
        # TODO prompt the player to hit or stand and take input from them
        break


# functions to display cards

def show_some(player,dealer):
    print("\nDealer's Hand:")
    print(" <card hidden>")
    print('',dealer.cards[1])
    print("\nPlayer's Hand:", *player.cards, sep='\n ')

def show_all(player,dealer):
    print("\nDealer's Hand:", *dealer.cards, sep='\n ')
    print("Dealer's Hand =",dealer.value)
    print("\nPlayer's Hand:", *player.cards, sep='\n ')
    print("Player's Hand =",player.value)


# functions to handle end of game scenarios

def player_busts(player,dealer,chips):
    print("Player busts!")
    chips.lose_bet()

def player_wins(player,dealer,chips):
    print("Player wins!")
    chips.win_bet()

def dealer_busts(player,dealer,chips):
    print("Dealer busts!")
    chips.win_bet()

def dealer_wins(player,dealer,chips):
    print("Dealer wins!")
    chips.lose_bet()

def push(player,dealer):
    print("Dealer and Player tie! It's a push.")






# AND NOW ON TO THE GAME!!!

# TODO Write a function to play the game using the aobve functions


# END OF THE PROGRAM! 
